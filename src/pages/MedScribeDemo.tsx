import React, { useState } from 'react';
import { DemoLayout } from '@/components/DemoLayout';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, FileText, CheckCircle2 } from 'lucide-react';
export function MedScribeDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [soapNote, setSoapNote] = useState<null | Record<string, string>>(null);
  const startRecording = () => {
    setIsRecording(true);
    setSoapNote(null);
    setTranscript("Simulating ambient clinical audio intake...");
    setTimeout(() => {
      setTranscript("Patient reports persistent joint pain in both knees, worse in the morning. Denies recent injury. Physical exam shows mild swelling in the right patellar region. Recommended Ibuprofen 400mg and follow-up in 2 weeks.");
    }, 2000);
  };
  const stopRecording = () => setIsRecording(false);
  const generateSOAP = () => {
    setSoapNote({
      Subjective: "Bilateral knee pain, morning stiffness. No trauma.",
      Objective: "Mild right patellar swelling noted on exam.",
      Assessment: "Osteoarthritis of knees, suspected flare-up.",
      Plan: "Ibuprofen 400mg PRN, 2-week follow-up."
    });
  };
  return (
    <DemoLayout title="MedScribe">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="p-8 rounded-4xl bg-white shadow-neu flex flex-col items-center gap-8 min-h-[400px]">
            <div className="h-24 flex items-center justify-center gap-1.5 w-full overflow-hidden">
              {isRecording ? (
                [...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-health-teal rounded-full"
                    animate={{ height: [20, 80, 40, 60, 20][i % 5] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.05 }}
                  />
                ))
              ) : (
                <div className="h-0.5 w-32 bg-muted rounded-full" />
              )}
            </div>
            <div className="center gap-4">
              {!isRecording ? (
                <Button onClick={startRecording} size="lg" className="rounded-full bg-health-teal hover:bg-health-teal/90 text-white px-8 py-7 shadow-lg shadow-health-teal/20">
                  <Mic className="mr-2 h-5 w-5" /> Start Ambient Scribe
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="destructive" size="lg" className="rounded-full px-8 py-7 shadow-lg shadow-red-500/20">
                  <Square className="mr-2 h-5 w-5" /> Stop Intake
                </Button>
              )}
            </div>
            <div className="w-full p-6 rounded-3xl bg-health-bg shadow-neu-inset font-mono text-sm text-health-dark leading-relaxed min-h-[150px]">
              {transcript || "Press start to begin clinical transcription..."}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-display font-bold text-health-dark">Documentation Output</h3>
            <Button disabled={!transcript || isRecording} onClick={generateSOAP} variant="outline" className="rounded-full shadow-neu-soft">
              <FileText className="mr-2 h-4 w-4" /> Generate SOAP Note
            </Button>
          </div>
          <AnimatePresence>
            {soapNote && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {Object.entries(soapNote).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-3xl bg-white shadow-neu-soft border-l-4 border-health-teal"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-health-teal" />
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{key}</span>
                    </div>
                    <p className="text-health-dark font-medium">{value}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DemoLayout>
  );
}