import { NextResponse } from "next/server";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";
import { formatAIResponse } from "../../../lib/formatResponse";
import Groq from "groq-sdk";

// Types
interface LocationData {
  id: string;
  name: string;
  description: string;
}

interface ElectionData {
  id: string;
  state: string;
  next_election: string;
  lok_sabha_seats: number;
}

// Groq Init
const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

// Caches
let cachedLocations: LocationData[] | null = null;
let cachedElections: ElectionData[] | null = null;

// Fetch functions
async function getLocations(): Promise<LocationData[]> {
  if (cachedLocations) return cachedLocations;
  try {
    const snapshot = await get(ref(db, "locations"));
    if (!snapshot.exists()) {
      cachedLocations = [];
      return cachedLocations;
    }
    
    const data = snapshot.val();
    cachedLocations = Object.entries(data || {}).map(([id, locData]: [string, any]) => ({
      id,
      name: locData.name || "",
      description: locData.description || "",
    }));
  } catch (e) {
    cachedLocations = [];
  }
  return cachedLocations;
}

async function getElections(): Promise<ElectionData[]> {
  if (cachedElections) return cachedElections;
  try {
    const snapshot = await get(ref(db, "elections"));
    if (!snapshot.exists()) {
      cachedElections = [];
      return cachedElections;
    }
    
    const data = snapshot.val();
    cachedElections = Object.entries(data || {}).map(([id, elecData]: [string, any]) => ({
      id,
      state: elecData.state || "",
      next_election: elecData.next_election || "",
      lok_sabha_seats: elecData.lok_sabha_seats || 0,
    }));
  } catch (e) {
    cachedElections = [];
  }
  return cachedElections;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, location: userLocation } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    // Normalization
    const queryLower = question.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
    const queryTokens = queryLower.split(/\s+/).filter(Boolean);

    // If user provided a location context, append it to tokens for matching
    const contextTokens = [...queryTokens];
    if (userLocation && typeof userLocation === "string") {
       const locLower = userLocation.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
       contextTokens.push(...locLower.split(/\s+/).filter(Boolean));
    }

    // STEP 1: Simple Location & Election Data
    const [locations, elections] = await Promise.all([getLocations(), getElections()]);

    for (const loc of locations) {
      if (contextTokens.includes(loc.name.toLowerCase())) {
        let answer = loc.description;
        
        // Enhance with election data if available
        const elec = elections.find(e => e.state.toLowerCase() === loc.name.toLowerCase());
        if (elec) {
          answer += ` The next election is scheduled for ${elec.next_election}. It holds ${elec.lok_sabha_seats} Lok Sabha seats.`;
        }

        return NextResponse.json({
          answer,
          source: "Location Info",
          badge: "📍",
          confidence: "High",
        });
      }
    }

    // STEP 2: Groq AI
    if (!groq) {
      return NextResponse.json({
        answer: "AI service unavailable. Please try again later.",
        source: "AI",
        badge: "🤖",
      });
    }

    const systemPrompt = `
You are an election education assistant that explains Indian elections in a simple, neutral, and educational way.
STRICT RULES:
- ONLY answer questions about Indian elections, electoral process, voting, eligibility, election commission, and related democratic procedures
- If the question is NOT about Indian elections, politely refuse and say: "I specialize only in Indian election education. Please ask about voting, elections, eligibility, or related democratic processes in India."
- Be concise, student-friendly, and educational
- NO political opinions, predictions, or partisan content
- Format your response with:
  • Clear paragraphs separated by blank lines
  • Bullet points using "•" for lists
  • **Bold text** for important terms and key concepts
  • Section breaks when covering multiple distinct aspects
- If the user mentioned their location (${userLocation || "unknown"}), tailor the election information accordingly
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: 0.2,
      max_tokens: 300,
    });

     return NextResponse.json({
       answer: formatAIResponse(completion.choices[0]?.message?.content || "Sorry, I couldn't process that."),
       source: "AI",
       badge: "🤖",
     });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}