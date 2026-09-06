"use client";

import { motion } from "motion/react";

export default function MinimalHeroAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-background">
      {/* Cool atmospheric glow */}
      <motion.div
        className="absolute -right-64 top-0"
        style={{
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgb(84 104 119 / 0.1) 0%, transparent 70%)`,
          filter: "blur(90px)",
        }}
        animate={{ y: [0, 70, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blue-gray atmospheric glow */}
      <motion.div
        className="absolute -bottom-48 left-0"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgb(84 104 119 / 0.08) 0%, transparent 70%)`,
          filter: "blur(90px)",
        }}
        animate={{ y: [0, -60, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Floating particles */}
      {[...Array(16)].map((_, i) => {
        const isBright = i % 4 === 0;
        const particleColor = isBright ? "rgb(107 127 143)" : "rgb(84 104 119)";
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
                width: isBright ? "7px" : "6px",
                height: isBright ? "7px" : "6px",
              background: particleColor,
              boxShadow: `0 0 ${isBright ? "20px" : "18px"} ${particleColor}`,
              left: `${15 + i * 5.5}%`,
              top: `${20 + i * 3.5}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              opacity: [0.5, 0.85, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        );
      })}

      {/* Animated routes */}
      <svg className="absolute inset-0 h-full w-full">
        {/* Primary route */}
        <motion.path
          d="M 0,230 Q 480,290 880,230 T 1760,230"
          fill="none"
          stroke="#546877"
          strokeWidth="2"
          strokeOpacity="0.35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        {/* Secondary route */}
        <motion.path
          d="M 0,380 Q 480,330 880,380 T 1760,380"
          fill="none"
          stroke="#546877"
          strokeWidth="2"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.8 }}
        />
        {/* Lighter route */}
        <motion.path
          d="M 0,520 Q 480,570 880,520 T 1760,520"
          fill="none"
          stroke="#6B7F8F"
          strokeWidth="1.5"
          strokeOpacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
        {/* Dashed blue-gray diagonal */}
        <motion.line
          x1="18%" y1="28%" x2="82%" y2="52%"
          stroke="#546877"
          strokeWidth="1.5"
          strokeOpacity="0.2"
          strokeDasharray="6,4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(84 104 119) 1px, transparent 1px),
            linear-gradient(90deg, rgb(84 104 119) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
}
