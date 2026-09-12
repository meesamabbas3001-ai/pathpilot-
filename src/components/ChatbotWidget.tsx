import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Assalam-o-Alaikum! I'm your PathPilot guidance assistant. I can help you explore HEC-recognized degrees, university entry tests (ECAT, MDCAT, NTS), and career paths in Pakistan. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEscalationPrompt, setShowEscalationPrompt] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [escalationSubmitted, setEscalationSubmitted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(1) // send previous chat history
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get response');

      const reply = data.reply;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      // Check if bot's response indicates fallback/uncertainty to offer escalation
      if (
        reply.toLowerCase().includes("don't have reliable information") ||
        reply.toLowerCase().includes("pass your question") ||
        reply.toLowerCase().includes("team so we can review")
      ) {
        setPendingQuestion(userMsg);
        setShowEscalationPrompt(true);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having a brief connection issue reaching our guidance server. Would you like me to forward your question directly to our counselor team (meesamabbas3001@gmail.com)?"
        }
      ]);
      setPendingQuestion(userMsg);
      setShowEscalationPrompt(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEscalateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: pendingQuestion, email: userEmail })
      });
      setEscalationSubmitted(true);
      setTimeout(() => {
        setShowEscalationPrompt(false);
        setEscalationSubmitted(false);
        setUserEmail('');
      }, 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-indigo-400/40 hover:scale-105"
          aria-label="Open PathPilot Career & Degree Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide">Ask Career Assistant</span>
        </button>
      ) : (
        <div className="w-[92vw] sm:w-[400px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 px-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-inner text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight">PathPilot Guidance Assistant</h3>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active • Pakistani Student Counselor
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Suggested Quick Prompts */}
          <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex gap-2 overflow-x-auto text-[11px] shrink-0">
            <button
              onClick={() => setInput("What can I study after FSc Pre-Medical?")}
              className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 whitespace-nowrap font-medium transition-colors shadow-2xs"
            >
              🩺 After Pre-Medical?
            </button>
            <button
              onClick={() => setInput("Is BS Computer Science worth it in Pakistan?")}
              className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 whitespace-nowrap font-medium transition-colors shadow-2xs"
            >
              💻 BSCS ROI & Salaries
            </button>
            <button
              onClick={() => setInput("Which universities accept ECAT?")}
              className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 whitespace-nowrap font-medium transition-colors shadow-2xs"
            >
              ⚙️ ECAT Universities
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
                  <span className="font-medium text-[11px] ml-1">Consulting PathPilot database...</span>
                </div>
              </div>
            )}

            {/* Escalation Prompt Card */}
            {showEscalationPrompt && (
              <div className="bg-indigo-50/90 border border-indigo-200 rounded-2xl p-4 text-xs space-y-3 shadow-sm animate-fade-in my-2">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-950 block">Want a direct answer from our counselor team?</span>
                    <span className="text-indigo-800/80 text-[11px]">We log unanswered questions to improve PathPilot. Provide your email if you'd like a follow-up at <span className="font-mono font-semibold">meesamabbas3001@gmail.com</span>.</span>
                  </div>
                </div>

                {!escalationSubmitted ? (
                  <form onSubmit={handleEscalateSubmit} className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email address (optional)"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors shadow-2xs"
                      >
                        Forward Question to Team
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEscalationPrompt(false)}
                        className="px-3 py-2 rounded-xl bg-white text-slate-600 border border-indigo-200 font-medium text-xs hover:bg-slate-100 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Question successfully forwarded to counselor team!</span>
                  </div>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about degrees, careers, ECAT/MDCAT..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3 text-slate-400" />
              <span>Unanswered questions are securely logged for team review.</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
