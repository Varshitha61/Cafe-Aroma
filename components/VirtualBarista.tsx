import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Coffee } from 'lucide-react';
import { getBaristaResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const VirtualBarista: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! 🙏 I am your Virtual Barista. How are you feeling today? I can help you choose the perfect brew!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await getBaristaResponse(inputValue);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I spilled the coffee! Try again later.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-stone-200 transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="bg-stone-900 p-4 flex justify-between items-center text-white border-b border-stone-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-900 rounded-full text-white">
                <Coffee size={16} />
              </div>
              <span className="font-serif font-semibold tracking-wide">AI Barista</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-stone-800 p-1 rounded text-stone-300 hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 bg-[#fafaf9] space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-amber-900 text-white rounded-br-none'
                      : 'bg-white text-stone-700 border border-stone-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 text-stone-500 p-3 rounded-2xl rounded-bl-none text-xs flex items-center gap-1 shadow-sm">
                  <span>Brewing response</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Suggest a coffee for a rainy day..."
              className="flex-1 px-4 py-2 border border-stone-200 rounded-full text-sm focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 bg-stone-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="bg-stone-900 text-white p-2.5 rounded-full hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-stone-700' : 'bg-stone-900'
        } text-white p-4 rounded-full shadow-xl hover:bg-stone-800 transition-all duration-300 hover:scale-105 flex items-center gap-2 group border-2 border-white/10`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium pr-1">Ask Barista</span>}
      </button>
    </div>
  );
};

export default VirtualBarista;