const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");
require("dotenv").config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const locations = [
  { name: "karnataka", description: "Karnataka is a state in the southern western region of India. It has a bicameral legislature." },
  { name: "maharashtra", description: "Maharashtra is a state in the western and central peninsular region of India." },
  { name: "delhi", description: "Delhi is a city and a union territory of India containing New Delhi, the capital of India." },
];

const elections = [
  { state: "karnataka", next_election: "2028", lok_sabha_seats: 28 },
  { state: "maharashtra", next_election: "2024", lok_sabha_seats: 48 },
  { state: "delhi", next_election: "2025", lok_sabha_seats: 7 },
];

const faqs = [
  { question: "What is Lok Sabha?", answer: "Lok Sabha is the lower house of the Indian Parliament. It has 543 elected members and representatives from all states and union territories.", category: "parliament", keywords: ["lok", "sabha", "parliament", "lower"] },
  { question: "How do I vote?", answer: "You must be an Indian citizen, 18+ years old, and registered as a voter. You vote at your designated polling booth using Electronic Voting Machines (EVMs).", category: "voting", keywords: ["vote", "voting", "election", "process"] },
  { question: "Who is an MLA?", answer: "MLA stands for Member of Legislative Assembly. MLAs are elected representatives of a state's legislative assembly. Each state has its own set of MLAs.", category: "representatives", keywords: ["mla", "member", "legislative", "assembly"] },
];

async function seed() {
  try {
    console.log("🌱 Seeding locations...");
    for (const loc of locations) {
      await set(ref(db, `locations/${loc.name}`), loc);
      console.log(`✓ Added location: ${loc.name}`);
    }
    
    console.log("\n🌱 Seeding elections...");
    for (const elec of elections) {
      await set(ref(db, `elections/${elec.state}`), elec);
      console.log(`✓ Added election: ${elec.state}`);
    }

    console.log("\n🌱 Seeding FAQs...");
    for (let i = 0; i < faqs.length; i++) {
      await set(ref(db, `faqs/faq${i}`), faqs[i]);
      console.log(`✓ Added FAQ: ${faqs[i].question}`);
    }
    
    console.log("\n✅ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding:", error);
    process.exit(1);
  }
}

seed();
