"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Role = "user" | "model";

type Msg = {
  id: string;
  role: Role;
  text: string;
  error?: boolean;
};

const WA = "https://wa.me/918190007072";

const CHIPS = [
  { label: "Buy a home", text: "I want to buy a home in Chennai." },
  { label: "Sell my home", text: "I want to sell my home." },
  { label: "Lease", text: "I'm looking to lease a home." },
  {
    label: "Join as an advisor",
    text: "I want to join Crestora as an advisor",
  },
  { label: "Talk on WhatsApp", text: "__whatsapp__" },
] as const;

export default function CrestoraAgentChat() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastFailed, setLastFailed] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const intentSent = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const historyPayload = useCallback((list: Msg[]) => {
    return list
      .filter((m) => !m.error && m.text.trim())
      .map((m) => ({ role: m.role, text: m.text }));
  }, []);

  const send = useCallback(
    async (text: string, opts?: { retry?: boolean; prior?: Msg[] }) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      if (trimmed === "__whatsapp__") {
        window.open(WA, "_blank", "noopener,noreferrer");
        return;
      }

      setLastFailed(null);
      setInput("");

      let base = opts?.prior ?? messages;
      if (!opts?.retry) {
        const userMsg: Msg = {
          id: `u-${Date.now()}`,
          role: "user",
          text: trimmed,
        };
        base = [...base.filter((x) => !x.error), userMsg];
        setMessages(base);
      } else {
        base = base.filter((x) => !x.error);
        setMessages(base);
      }

      const agentId = `a-${Date.now()}`;
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyPayload(base) }),
        });

        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(data.error || "Request failed");
        }

        setMessages((m) => [...m, { id: agentId, role: "model", text: "" }]);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let produced = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const piece = decoder.decode(value, { stream: true });
          if (!piece) continue;
          produced = true;
          setLoading(false);
          setMessages((m) =>
            m.map((msg) =>
              msg.id === agentId ? { ...msg, text: msg.text + piece } : msg
            )
          );
        }

        if (!produced) throw new Error("Empty reply");
      } catch {
        setLastFailed(trimmed);
        setMessages((m) => {
          const withoutEmpty = m.filter((x) => !(x.id === agentId && !x.text));
          return [
            ...withoutEmpty.filter((x) => !x.error),
            {
              id: `e-${Date.now()}`,
              role: "model",
              text: "Something went wrong. Please try again.",
              error: true,
            },
          ];
        });
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [historyPayload, loading, messages]
  );

  useEffect(() => {
    const intent = searchParams.get("intent");
    if (intent === "advisor" && !intentSent.current) {
      intentSent.current = true;
      void send("I want to join Crestora as an advisor", { prior: [] });
    }
    // intentionally once on mount for ?intent=advisor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startOver() {
    if (loading) return;
    intentSent.current = true; // prevent auto re-send after clear
    setMessages([]);
    setLastFailed(null);
    setInput("");
    inputRef.current?.focus();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const showEmpty = useMemo(
    () => messages.length === 0 && !loading,
    [messages.length, loading]
  );

  return (
    <div className="agent-shell">
      <header className="agent-header">
        <div className="agent-header-inner">
          <div className="agent-brand">
            <Link href="/" className="agent-home">
              ← Home
            </Link>
            <div className="agent-brand-text">
              <Link href="/" className="agent-logo">
                CRESTORA
              </Link>
              <span className="agent-sub">AI agent · replies in seconds</span>
            </div>
          </div>
          <button
            type="button"
            className="agent-restart"
            onClick={startOver}
            disabled={loading}
          >
            Start over
          </button>
        </div>
      </header>

      <main className="agent-main">
        {showEmpty ? (
          <div className="agent-empty">
            <h1>Tell us how you want to live.</h1>
            <p>
              Crestora’s AI agent helps with buying, selling, leasing, or joining
              as an advisor — then hands you to WhatsApp when you’re ready.
            </p>
            <div className="agent-chips">
              {CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="agent-chip"
                  onClick={() => void send(chip.text)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="agent-thread">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`agent-row ${msg.role === "user" ? "is-user" : "is-agent"}`}
              >
                <div
                  className={`agent-bubble ${msg.role === "user" ? "user" : "bot"}`}
                >
                  <p>{msg.text}</p>
                  {msg.error && lastFailed && (
                    <button
                      type="button"
                      className="agent-retry"
                      onClick={() => void send(lastFailed, { retry: true })}
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="agent-row is-agent">
                <div className="agent-bubble bot typing" aria-label="Typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      <form className="agent-composer" onSubmit={onSubmit}>
        <div className="agent-composer-inner">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Ask about buying, selling, leasing…"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
