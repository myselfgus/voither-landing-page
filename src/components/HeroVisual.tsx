import React from 'react';
import { motion } from 'framer-motion';
export function HeroVisual() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#00A896 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} 
      />
      {/* Decorative Nodes */}
      <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle 
          cx="100" cy="100" r="4" fill="#00A896"
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.path 
          d="M100 100 L250 180 L400 120" stroke="#00A896" strokeWidth="0.5" 
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle 
          cx="1340" cy="600" r="6" fill="#00A896"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.path 
          d="M1340 600 L1200 450 L1000 550" stroke="#00A896" strokeWidth="0.5" 
          strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        {/* Soft Ambient Globs */}
        <motion.circle 
          cx="200" cy="400" r="150" fill="url(#grad1)" 
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <defs>
          <radialGradient id="grad1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 400) rotate(90) scale(150)">
            <stop stopColor="#00A896" stopOpacity="0.1" />
            <stop offset="1" stopColor="#00A896" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}