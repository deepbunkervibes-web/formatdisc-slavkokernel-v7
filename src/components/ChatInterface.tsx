import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

import { Message, Sender } from '../types';
// FIX: Import GeminiHistoryPart to explicitly type the history array.
import { sendMessageToGemini, GeminiHistoryPart } from '../services/geminiService';

import { GlassCard } from './GlassCard';

interface ChatInterfaceProps {}

export const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Greetings. I am Lumina. I can help you implement the 'Ethereal Cupertino' aesthetic. Ask me about gradients, warm backgrounds, or responsive glassmorphism.",
      sender: Sender.BOT,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare history for API
      // FIX: Explicitly type `history` to ensure role is correctly typed as 'user' | 'model', preventing a TypeScript error.
      const history: GeminiHistoryPart[] = messages.map(m => ({
        role: m.sender === Sender.USER ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(history, userMsg.text);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.BOT,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <GlassCard className="flex flex-col h-[600px] w-full max-w-2xl mx-auto overflow-hidden transition-all duration-500">
      {/* Header */}
      <div className="p-4 border-b border-white/30 flex items-center justify-between bg-white/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Lumina Design Assistant</h3>
            <p className="text-xs text-slate-500">Powered by Gemini 2.5</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === Sender.USER ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div 
              className={`
                w-8 h-8 rounded-full flex items-center justify-center shrink-0
                ${msg.sender === Sender.USER 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-white text-indigo-500 shadow-sm'}
              `}
            >
              {msg.sender === Sender.USER ? <User size={14} /> : <Bot size={14} />}
            </div>
            
            <div 
              className={`
                max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.sender === Sender.USER 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-white/80 backdrop-blur-sm text-slate-700 rounded-tl-none border border-white/40'}
              `}
            >
              {msg.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i !== msg.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-sm ml-12">
            <Loader2 size={14} className="animate-spin" />
            <span>Refining aesthetics...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/40 border-t border-white/30">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about gradients, colors, or animations..."
            className={`
              w-full pl-4 pr-12 py-3 rounded-xl outline-none transition-all duration-300
              bg-white/50 backdrop-blur-sm border border-white/60 focus:bg-white/80
              placeholder-slate-400 text-slate-700 focus:shadow-md
              focus:ring-2 focus:ring-indigo-200
            `}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all
              ${inputValue.trim() 
                ? 'bg-slate-800 text-white hover:bg-slate-900' 
                : 'bg-transparent text-slate-400 cursor-not-allowed'}
            `}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
