import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, MessageSquare } from "lucide-react";
import { askWanderAIChatbot } from "../services/geminiService";

const SUGGESTED_QUESTIONS = [
  "How many days should I spend here?",
  "What are the best places for photography?",
  "When is the best time to visit?",
  "Is this destination expensive?",
  "What food should I try?",
  "What should I pack?",
  "How should I travel around the city?"
];

export function AIChatbot({ destination }) {
  const msgIdCounter = useRef(1);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: `Hello! I'm your WanderAI concierge for **${destination.name}, ${destination.country}**. Ask me about itinerary ideas, local dishes, hidden photography spots, packing, or navigating the city!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionToSend) => {
    const text = (questionToSend || input).trim();
    if (!text || loading) return;

    const uId = `u-${msgIdCounter.current++}`;
    const userMsg = {
      id: uId,
      role: "user",
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askWanderAIChatbot(destination, text, messages);
      const aId = `a-${msgIdCounter.current++}`;
      const assistantMsg = {
        id: aId,
        role: "assistant",
        text: reply,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn("Chatbot response error:", err);
      const fId = `f-${msgIdCounter.current++}`;
      const fallbackMsg = {
        id: fId,
        role: "assistant",
        text: `Visiting **${destination.name}** is incredible. For ${destination.name}, top highlights include ${destination.famousPlaces?.map(p => p.name).slice(0, 3).join(", ")}. Be sure to pack comfortable shoes and plan around ${destination.bestTime}!`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };



  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl flex flex-col h-[560px]">
      {/* Chatbot Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>🤖 WanderAI Travel Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
            </h4>
            <p className="text-[11px] text-slate-400">
              Personalized for {destination.name}, {destination.country}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: "welcome-reset",
                role: "assistant",
                text: `Chat reset. What would you like to explore regarding **${destination.name}**?`,
                timestamp: new Date()
              }
            ]);
          }}

          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors text-xs flex items-center gap-1 cursor-pointer"
          title="Clear chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs shadow-sm ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-cyan-500/20 border border-cyan-500/30 text-cyan-300"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/10"
                    : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div
                  className={`text-[9px] mt-1 text-right ${
                    isUser ? "text-cyan-200/80" : "text-slate-400"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-slate-400 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">WanderAI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] text-slate-400 uppercase font-semibold whitespace-nowrap flex items-center gap-1">
          <MessageSquare className="w-3 h-3 text-cyan-400" />
          Suggested:
        </span>
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="px-3 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 text-[11px] whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder={`Ask anything about ${destination.name}...`}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-1.5 cursor-pointer"
            aria-label="Send message"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatbot;