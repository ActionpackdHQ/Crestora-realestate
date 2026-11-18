import { NextResponse } from "next/server";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { CRESTORA_INSTRUCTIONS } from "@/lib/crestora-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

function clientError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
      return clientError("AI agent is not configured yet.", 503);
    }

    let body: { messages?: ChatMessage[] };
    try {
      body = (await req.json()) as { messages?: ChatMessage[] };
    } catch {
      return clientError("Invalid request.", 400);
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) {
      return clientError("Message is empty.", 400);
    }

    const last = messages[messages.length - 1];
    if (!last?.text?.trim() || last.role !== "user") {
      return clientError("Last message must be from the user.", 400);
    }
    if (last.text.trim().length > 4000) {
      return clientError("Message is too long.", 400);
    }

    const contents = messages
      .filter((m) => m.text?.trim() && (m.role === "user" || m.role === "model"))
      .map((m) => ({
        role: m.role,
        parts: [{ text: m.text.trim() }],
      }));

    const ai = new GoogleGenAI({ apiKey });

    // Prefer thinkingBudget: 0 when supported; fall back to MINIMAL / no thinkingConfig
    let stream;
    try {
      stream = await ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction: CRESTORA_INSTRUCTIONS,
          temperature: 0.3,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });
    } catch {
      try {
        stream = await ai.models.generateContentStream({
          model,
          contents,
          config: {
            systemInstruction: CRESTORA_INSTRUCTIONS,
            temperature: 0.3,
            thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
          },
        });
      } catch {
        stream = await ai.models.generateContentStream({
          model,
          contents,
          config: {
            systemInstruction: CRESTORA_INSTRUCTIONS,
            temperature: 0.3,
          },
        });
      }
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          let produced = false;
          for await (const chunk of stream) {
            const piece = chunk.text;
            if (!piece) continue;
            produced = true;
            controller.enqueue(encoder.encode(piece));
          }
          if (!produced) {
            controller.enqueue(
              encoder.encode(
                "I couldn't form a reply just then — please try again, or continue on WhatsApp."
              )
            );
          }
          controller.close();
        } catch (err) {
          console.error(
            "[api/chat stream]",
            err instanceof Error ? err.message : "error"
          );
          controller.enqueue(
            encoder.encode("\n\nSomething went wrong. Please try again.")
          );
          controller.close();
        }
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[api/chat]", err instanceof Error ? err.message : "error");
    return clientError("Something went wrong. Please try again.", 500);
  }
}
