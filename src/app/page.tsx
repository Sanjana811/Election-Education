"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  source?: string;
  badge?: string;
  confidence?: string;
  category?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "bot",
      content: "Namaste! I am the India Elections Education Assistant. You can ask me anything about National, State, or Local elections, voting mechanisms, or eligibility criteria.",
      source: "System",
      badge: "🇮🇳"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const textToSubmit = textOverride || input;
    if (!textToSubmit.trim() || isLoading) return;

    // Detect "I am from"
    const lowerText = textToSubmit.toLowerCase();
    let newLocation = userLocation;
    if (lowerText.includes("i am from")) {
      const parts = lowerText.split("i am from");
      if (parts[1]) {
        newLocation = parts[1].trim().replace(/[^\w\s]/g, '');
        setUserLocation(newLocation);
      }
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSubmit.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.content, location: newLocation }),
      });

      const data = await res.json();

      if (res.ok) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: data.answer,
          source: data.source,
          badge: data.badge,
          confidence: data.confidence,
          category: data.category || data.context,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || "Failed to fetch response");
      }
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Sorry, I am unable to process your request at the moment. Please consult the official ECI website.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {activeTab === 'home' ? (
        <div className="home-container animate-fade-in">
          <div className="home-hero">
            <h1>India Elections Education</h1>
            <p>Your interactive guide to understanding the world's largest democracy.</p>
            {userLocation && <p style={{color: 'var(--accent-saffron)', marginTop: '8px', fontSize: '0.9rem'}}>📍 Current Location: {userLocation}</p>}
          </div>
          <div className="home-menu">
            <button className="menu-card" onClick={() => setActiveTab('chat')}>
              <div className="menu-icon">💬</div>
              <h3>AI Assistant</h3>
              <p>Ask anything about elections, voting, and democracy.</p>
            </button>
            <button className="menu-card" onClick={() => setActiveTab('timeline')}>
              <div className="menu-icon">🏛️</div>
              <h3>Election Timeline</h3>
              <p>Explore the history of Indian elections.</p>
            </button>
            <button className="menu-card" onClick={() => setActiveTab('know_elections')}>
              <div className="menu-icon">🗳️</div>
              <h3>Know Your Elections</h3>
              <p>Understand Lok Sabha, Rajya Sabha & Local Bodies.</p>
            </button>
            <button className="menu-card" onClick={() => setActiveTab('voter_guide')}>
              <div className="menu-icon">📋</div>
              <h3>Voter Guide</h3>
              <p>Step-by-step guide on eligibility and registration.</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="app-container animate-fade-in">
          <header className="header" style={{ position: 'relative' }}>
            <button className="back-btn" onClick={() => setActiveTab('home')}>
              ← Back
            </button>
            <h1>
              {activeTab === 'chat' && "Election Assistant"}
              {activeTab === 'timeline' && "Election Timeline"}
              {activeTab === 'know_elections' && "Know Your Elections"}
              {activeTab === 'voter_guide' && "Voter Guide"}
            </h1>
            <p>Your guide to understanding India's democratic process</p>
          </header>

          {activeTab === 'chat' && (
            <>
              <main className="chat-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.role} animate-fade-in`}>
             <div className={`message ${msg.role}`}>
               {/* Render formatted content with HTML tags for bot messages */}
               {msg.role === "bot" && msg.source === "AI" ? (
                 <div
                   dangerouslySetInnerHTML={{
                     __html: msg.content
                       .replace(/\n/g, '<br>')  // Convert newlines to <br>
                       .replace(/•/g, '• ')    // Ensure bullet points have space
                       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold text
                   }}
                 />
               ) : (
                 msg.content
               )}
             </div>
            {msg.role === "bot" && msg.source && (
              <div className="meta-data">
                <span className={`badge ${msg.source.toLowerCase().replace(/\s+/g, '-')}`}>
                  {msg.badge} {msg.source}
                </span>
                {msg.confidence && <span>• Confidence: {msg.confidence}</span>}
                {msg.category && <span>• Topic: {msg.category}</span>}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="typing-indicator animate-fade-in">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="input-section">
        <div className="input-container">
          <form className="input-box" onSubmit={handleSend}>
            <input
              type="text"
              className="input-field"
              placeholder="Ask a question about elections..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              autoFocus
            />
            <button type="submit" className="send-btn" disabled={!input.trim() || isLoading}>
              Send
            </button>
          </form>
        </div>
      </div>
        </>
      )}

      {activeTab === 'timeline' && (
        <div className="feature-section animate-fade-in">
          <h2 className="feature-title">🏛️ History of Indian Elections</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">1950</div>
                <div className="timeline-title">Election Commission Formed</div>
                <div className="timeline-text">The Election Commission of India was established on 25th January.</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">1951-52</div>
                <div className="timeline-title">First General Elections</div>
                <div className="timeline-text">India held its first elections with universal adult suffrage.</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">1989</div>
                <div className="timeline-title">Voting Age Lowered</div>
                <div className="timeline-text">The voting age was reduced from 21 to 18 years via the 61st Amendment.</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">1998</div>
                <div className="timeline-title">EVMs Introduced</div>
                <div className="timeline-text">Electronic Voting Machines were used for the first time in select constituencies.</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">2013</div>
                <div className="timeline-title">NOTA Option Added</div>
                <div className="timeline-text">The Supreme Court directed the ECI to provide a 'None of the Above' option.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'know_elections' && (
        <div className="feature-section animate-fade-in">
          <h2 className="feature-title">🗳️ Types of Elections in India</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Lok Sabha (National)</h3>
              <p>Direct election for Members of Parliament (MPs) to form the Central Government.</p>
              <ul>
                <li><strong>Seats:</strong> 543 elected members</li>
                <li><strong>Term:</strong> 5 years</li>
                <li><strong>Voting System:</strong> First-past-the-post</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Rajya Sabha (State Council)</h3>
              <p>Indirect election for the Upper House of Parliament representing States.</p>
              <ul>
                <li><strong>Seats:</strong> 245 (233 elected, 12 nominated)</li>
                <li><strong>Term:</strong> 6 years (1/3rd retire every 2 years)</li>
                <li><strong>Voting System:</strong> Single Transferable Vote</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Vidhan Sabha (State)</h3>
              <p>Direct election for Members of Legislative Assembly (MLAs) to form State Governments.</p>
              <ul>
                <li><strong>Seats:</strong> Varies by state population</li>
                <li><strong>Term:</strong> 5 years</li>
                <li><strong>Voting System:</strong> First-past-the-post</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Local Bodies</h3>
              <p>Elections for Municipalities (urban) and Panchayats (rural).</p>
              <ul>
                <li><strong>Tiers:</strong> Village, Block, District</li>
                <li><strong>Term:</strong> 5 years</li>
                <li><strong>Representation:</strong> Includes reserved seats for women and marginalized communities.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'voter_guide' && (
        <div className="feature-section animate-fade-in">
          <h2 className="feature-title">📋 Voter Guide</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>1. Eligibility</h3>
              <p>To vote in Indian elections, you must meet the following criteria:</p>
              <ul>
                <li>Be an Indian Citizen</li>
                <li>Be 18 years of age or older</li>
                <li>Be enrolled in the electoral roll of your constituency</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>2. Registration</h3>
              <p>How to register as a new voter:</p>
              <ul>
                <li>Fill out <strong>Form 6</strong> online via the NVSP portal or offline.</li>
                <li>Submit age and address proof.</li>
                <li>Track your application status online.</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>3. Voting Day</h3>
              <p>What to do at the polling booth:</p>
              <ul>
                <li>Carry your EPIC (Voter ID) or an approved photo ID.</li>
                <li>Verify your name on the electoral roll.</li>
                <li>Press the button next to your candidate on the EVM.</li>
                <li>Check the VVPAT slip to confirm your vote.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
        </div>
      )}
    </>
  );
}
