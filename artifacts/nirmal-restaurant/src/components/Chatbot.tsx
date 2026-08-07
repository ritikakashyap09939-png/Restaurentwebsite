import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Namaste! I can help with Nirmal Restaurant, menu, party hall, bookings, location and timings. What would you like to know?",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const userMessage: ChatMessage = { role: "user", content: question };
    const history = messages.slice(-6);
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.answer ??
            data.error ??
            "Please call +91 98139 54399 for assistance.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "The assistant is temporarily unavailable. Please call +91 98139 54399.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <section
          aria-label="Nirmal restaurant assistant"
          className="mb-3 flex h-[min(560px,calc(100vh-120px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[#e7d7bf] bg-[#fffaf4] shadow-2xl"
        >
          <header className="flex items-center justify-between bg-[#8B1A1A] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C842] text-[#8B1A1A]">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-lg font-bold">Nirmal Assistant</h2>
                <p className="text-xs text-white/70">Restaurant & Party Hall</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 transition-colors hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-sm bg-[#8B1A1A] text-white"
                      : "rounded-bl-sm border border-[#eadbc8] bg-white text-[#3b302a]"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-[#eadbc8] bg-white px-4 py-3 text-[#8B1A1A]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#eadbc8] bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#ddcbb5] bg-[#fffaf4] px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#F5C842]">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about our restaurant..."
                maxLength={500}
                aria-label="Ask the restaurant assistant"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#2c2c2c] outline-none placeholder:text-[#9d9187]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A] text-white transition-colors hover:bg-[#6f1111] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-[#9d9187]">
              Ask only about Nirmal Restaurant & Party Hall
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={open ? "Close restaurant assistant" : "Open restaurant assistant"}
        onClick={() => setOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8B1A1A] text-white shadow-xl ring-4 ring-white/70 transition-all hover:scale-105 hover:bg-[#6f1111]"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}