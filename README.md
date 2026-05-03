# 🇮🇳 India Elections Education Assistant

An interactive, educational web application built to help citizens understand the world's largest democracy. This tool provides a neutral, easy-to-understand overview of Indian elections, voting processes, and democratic history.

## ✨ Features

- **💬 AI Assistant:** Ask any questions about elections, voting, or democracy and get instant, accurate, and neutral answers. (Powered by Groq Llama 3).
- **🏛️ Election Timeline:** A visual, chronological history of key milestones in Indian elections from 1950 to the present.
- **🗳️ Know Your Elections:** Easy-to-read guides explaining the structure of the Lok Sabha, Rajya Sabha, Vidhan Sabha, and Local Bodies.
- **📋 Voter Guide:** Step-by-step instructions covering voter eligibility, registration (Form 6), and what to expect at the polling booth on election day.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** Vanilla CSS with custom glassmorphism UI
- **Backend API:** Next.js API Routes
- **AI Integration:** [Groq SDK](https://groq.com/) (Llama-3.3-70b-versatile)
- **Database:** Firebase Realtime Database (for Location/State Data)

## 🛠️ Getting Started

First, clone the repository:
```bash
git clone https://github.com/Sanjana811/Election-Education.git
cd Election-Education
```

Install the dependencies:
```bash
npm install
```

Set up your environment variables by creating a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request to help expand the educational content or improve the AI assistant.

## 📄 License

This project is open-source and available under the MIT License.
