const { GoogleGenAI } = require("@google/genai");

const CRESTORA_SYSTEM_INSTRUCTION = `You are the official AI agent for CRESTORA — a premium real-estate advisory brand based in Chennai, India.

## Voice
- Warm, polished, concise. Sound like a trusted advisor, not a generic chatbot.
- Prefer clear English. Keep replies short (2–5 sentences) unless the user asks for detail.
- Never invent listings, prices, or legal advice. If specifics are missing, ask 1–2 clarifying questions.

## Brand facts
- Brand: CRESTORA only. Do not mention other brokerages.
- Studio: 14, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu 600034.
- Contact: WhatsApp +91 81900 07072; email hello@actionpackd.com (demo inbox).
- Offerings: Acquire (buy), List (sell), Lease; also lending partners, residence stewardship, design & development counsel.
- Promise: an AI agent on WhatsApp replies in under a minute, day or night, with clear next steps — not a callback ticket.

## Goals
- Help with buying, selling, leasing, budgets, neighbourhood fit, and booking a tour/conversation.
- When the user is ready to act, invite them to continue on WhatsApp (+91 81900 07072).
- Stay on-topic for Crestora / Chennai real estate. Politely redirect unrelated requests.
`;

function sse(data) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function toContents(history) {
  if (!Array.isArray(history)) return [];
  const out = [];
  for (const item of history) {
    if (!item || typeof item.text !== "string") continue;
    const role = item.role === "model" || item.role === "bot" ? "model" : "user";
    const text = item.text.trim();
    if (!text) continue;
    out.push({ role, parts: [{ text }] });
  }
  return out.slice(-16);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

  if (!apiKey) {
    res.status(503).json({ error: "Assistant is not configured yet." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "Invalid request." });
      return;
    }
  }
  body = body || {};

  const text = String(body.text || "").trim();
  if (!text) {
    res.status(400).json({ error: "Message is empty." });
    return;
  }
  if (text.length > 4000) {
    res.status(400).json({ error: "Message is too long." });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const history = toContents(body.history);
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: CRESTORA_SYSTEM_INSTRUCTION,
        maxOutputTokens: 500,
      },
      history,
    });

    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    const stream = await chat.sendMessageStream({ message: text });
    let produced = false;

    for await (const chunk of stream) {
      const piece = chunk.text;
      if (!piece) continue;
      produced = true;
      res.write(sse({ text: piece }));
    }

    if (!produced) {
      res.write(
        sse({
          text: "I couldn't form a reply just then — please try again.",
        })
      );
    }
    res.write(sse({ done: true }));
    res.end();
  } catch (err) {
    console.error("[api/chat]", err instanceof Error ? err.message : err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Something went wrong. Please try again." });
      return;
    }
    try {
      res.write(sse({ error: "Something went wrong. Please try again." }));
      res.end();
    } catch {
      /* ignore */
    }
  }
};
