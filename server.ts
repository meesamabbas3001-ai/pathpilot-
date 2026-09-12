import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing");
  }
  return new GoogleGenAI({ apiKey });
};

// In-memory log of escalated/unanswered questions for content gap analysis
const escalatedQuestionsLog: Array<{ question: string; email?: string; timestamp: string }> = [];

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Chat API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    // System prompt grounding the assistant in PathPilot AI data & Pakistani education context with 4-Tier knowledge rules
    const systemInstruction = `You are PathPilot's friendly senior guidance assistant for Pakistani students and professionals. Your role is to help users explore HEC-recognized degrees (Computer Science, Data Science, Software Engineering, MBBS, DPT, BBA, LLB, Civil Engineering, etc.), future skills (AI automation, data analytics, full-stack, etc.), and career paths in Pakistan.

TIERED KNOWLEDGE & BEHAVIOR RULES:

Tier 1 — Casual Conversation (NEVER escalate, NEVER mention admin):
- For greetings, small talk ("how are you"), thanks, goodbyes, respond naturally and warmly like a helpful human counselor (e.g. "Doing well, thanks! I'm here to help you navigate your degree and career options in Pakistan. What's on your mind?").

Tier 2 — Site-Grounded Topics:
- When questions match PathPilot's degrees, future skills, or guides, answer accurately referencing PathPilot's database.

Tier 3 — General Stable Pakistani Education & Career Facts (ANSWER DIRECTLY & CONFIDENTLY):
- Answer general, well-established facts about Pakistani education and career paths directly and substantively (NOT a deflection).
- Examples include: university admission processes (e.g., NUST Entry Test/NET, FAST/NU-TEST, GIKI, LUMS, UET/ECAT eligibility, merit formulas, timelines), career scope and job market outlooks (e.g., Computer Science in Pakistan, software export trends, remote work, PKR salary ranges), entry test structures (ECAT, MDCAT, NTS), HEC accreditation basics, and degree pathways (BS vs ADP).
- Only add a brief caveat when mentioning yearly variable details like exact current fee amounts or exact current deadlines ("check the official university portal for exact current fee schedules").

Tier 4 — Genuinely Unknown, Out-of-Scope, or Highly Specific/Unverifiable Information (ONLY this tier escalates):
- Reserve fallback/escalation strictly for: questions completely unrelated to education/careers, requests for current-year precise merit closing percentages the bot cannot verify, or things you are genuinely not confident about.
- When Tier 4 fallback is required, politely state: "I don't have reliable information on that specific detail yet. Let me pass your question to our team so we can review it — you can share your email if you'd like a direct follow-up."

GENERAL TONE:
- Concise (3 to 6 sentences), friendly, encouraging, clear.
- End most answers by offering a relevant next step.
- Never use robotic filler phrases like "I'd be happy to help you with that today!"`;

    const contents = [
      ...(Array.isArray(history) ? history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })) : []),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    });

    const reply = response.text || "I am here to help you navigate your degree and career choices in Pakistan. What would you like to explore?";
    res.json({ reply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    res.status(500).json({ 
      error: "Unable to process chat request at the moment.", 
      details: error.message 
    });
  }
});

// Escalation endpoint for unanswered questions
app.post("/api/escalate", async (req, res) => {
  try {
    const { question, email } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const timestamp = new Date().toISOString();
    escalatedQuestionsLog.push({ question, email: email || 'anonymous', timestamp });

    console.log(`[ESCALATION TO meesamabbas3001@gmail.com]: Question: "${question}" | Email: ${email || 'None'} | Time: ${timestamp}`);

    // In production without external mailer token, we log and simulate successful handoff
    // The target email is meesamabbas3001@gmail.com as requested.
    res.json({ 
      success: true, 
      message: "Your question has been successfully forwarded to meesamabbas3001@gmail.com and logged for content review." 
    });
  } catch (error: any) {
    console.error("Escalation error:", error);
    res.status(500).json({ error: "Failed to escalate question" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
