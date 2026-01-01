import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, AlertCircle, Bookmark } from 'lucide-react';
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
  }, [messages, isLoading]);
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
      if (response.success) {
        const history = await chatService.getMessages();
        if (history.success && history.data) {
          setMessages(history.data.messages);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const extractCitations = (content: string) => {
    const matches = content.match(/\[(.*?)\]/g);
    return matches ? matches.map(m => m.slice(1, -1)) : [];
  };
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[550px] rounded-4xl bg-white/80 backdrop-blur-2xl shadow-neu overflow-hidden flex flex-col border border-white/40"
          >
            <div className="p-6 bg-health-dark text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-health-teal shadow-glow center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Voither AACI</h4>
                  <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">Ambient-Agentic Assistant</p>
                </div>
              </div>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-health-bg/50 m-2 rounded-3xl shadow-neu-inset">
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-2 opacity-60">
                  <p className="text-sm font-semibold text-health-dark italic">"How does MedScribe integrate with existing EHRs?"</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-black">Ask about our AACI Engine capabilities</p>
                </div>
              )}
              {messages.map((m) => {
                const citations = extractCitations(m.content);
                return (
                  <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-3xl shadow-neu-soft text-sm leading-relaxed ${
                      m.role === 'user' ? 'bg-health-teal text-white' : 'bg-white/90 text-health-dark border border-white/50'
                    }`}>
                      {m.content}
                    </div>
                    {citations.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {citations.map((cite, i) => (
                          <div key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-health-teal/10 text-[9px] font-bold text-health-teal">
                            <Bookmark className="h-2 w-2" /> {cite}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-3xl bg-white/90 text-health-dark shadow-neu-soft border border-white/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-health-teal animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">AutoRAG Synthesizing...</span>
                    </div>
                    <motion.div 
                      className="h-1 bg-health-teal/20 rounded-full overflow-hidden w-24"
                    >
                      <motion.div 
                        animate={{ x: [-48, 96] }} 
                        transition={{ repeat: Infinity, duration: 1.5 }} 
                        className="h-full w-12 bg-health-teal"
                      />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 space-y-3 bg-white/50 backdrop-blur-md">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query AACI Knowledge Base..."
                  className="rounded-full shadow-neu-inset border-none bg-health-bg px-6 h-12"
                />
                <Button onClick={handleSend} size="icon" className="h-12 w-12 rounded-full bg-health-teal text-white shadow-lg shadow-health-teal/20 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[9px] text-center text-muted-foreground/50 flex items-center justify-center gap-1 font-medium">
                <AlertCircle className="h-3 w-3" /> Shared AI resource limits apply across user platforms.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-health-teal hover:bg-health-teal/90 text-white shadow-glow transition-transform hover:scale-110 active:scale-95 z-50 border-4 border-white/20"
      >
        <MessageCircle className={`h-7 w-7 transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'opacity-100'}`} />
        <X className={`h-7 w-7 absolute transition-transform duration-300 ${isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`} />
      </Button>
    </div>
  );
}