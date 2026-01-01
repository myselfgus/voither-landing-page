import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatService } from '@/lib/chat';
import type { Message } from '../../worker/types';
export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await chatService.sendMessage(input);
      if (response.success && response.data) {
        setMessages(response.data.messages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] rounded-4xl bg-white shadow-neu overflow-hidden flex flex-col border border-white/40"
          >
            <div className="p-6 bg-health-dark text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-health-teal shadow-glow center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Voither Assistant</h4>
                  <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">Ambient Support AI</p>
                </div>
              </div>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-health-bg shadow-neu-inset m-2 rounded-3xl">
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-2">
                  <p className="text-sm font-medium text-health-dark">How can I help with your clinical workflow?</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Ask about AACI Engine, MedScribe or Analytics</p>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl shadow-neu-soft text-sm ${
                    m.role === 'user' ? 'bg-health-teal text-white' : 'bg-white text-health-dark border border-white/50'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-3xl bg-white text-health-dark shadow-neu-soft border border-white/50">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      Thinking...
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="rounded-full shadow-neu-inset border-none bg-health-bg px-6"
                />
                <Button onClick={handleSend} size="icon" className="rounded-full bg-health-teal text-white shadow-lg shadow-health-teal/20 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[9px] text-center text-muted-foreground/60 flex items-center justify-center gap-1">
                <AlertCircle className="h-3 w-3" /> Note: There is a limit on AI requests across user apps.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-health-teal hover:bg-health-teal/90 text-white shadow-glow transition-transform hover:scale-110 active:scale-95 z-50"
      >
        <MessageCircle className={`h-7 w-7 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </Button>
    </div>
  );
}