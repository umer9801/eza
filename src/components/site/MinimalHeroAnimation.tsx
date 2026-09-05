"use client";

import { motion } from "motion/react";

export default function MinimalHeroAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-noir">
      {/* Subtle champagne atmospheric glow - luxury lighting */}
      <motion.div
        className="absolute -right-64 top-0"
        style={{
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgb(200 169 121 / 0.08) 0%, transparent 70%)`,
          filter: "blur(90px)",
        }}
        animate={{
          y: [0, 70, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-48 left-0"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgb(200 169 121 / 0.06) 0%, transparent 70%)`,
          filter: "blur(90px)",
        }}
        animate={{
          y: [0, -60, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Floating luxury particles - champagne + strategic red */}
      {[...Array(16)].map((_, i) => {
        // Strategic use: 80% champagne, 20% luxury red
        const isExpressRoute = i % 5 === 0;
        const particleColor = isExpressRoute ? "rgb(217 74 74)" : "rgb(200 169 121)";
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: isExpressRoute ? "8px" : "6px",
              height: isExpressRoute ? "8px" : "6px",
              background: particleColor,
              boxShadow: `0 0 ${isExpressRoute ? '28px' : '22px'} ${particleColor}`,
              left: `${15 + (i * 5.5)}%`,
              top: `${20 + (i * 3.5)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.6, isExpressRoute ? 1 : 0.9, 0.6],
              scale: [1, isExpressRoute ? 1.5 : 1.3, 1],
            }}
            transition={{
              duration: isExpressRoute ? 5 : 8 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        );
      })}

      {/* Animated luxury logistics routes */}
      <svg className="absolute inset-0 h-full w-full">
        {/* Premium champagne route 1 */}
        <motion.path
          d="M 0,230 Q 480,290 880,230 T 1760,230"
          fill="none"
          className="stroke-champagne"
          strokeWidth="2.5"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Express route - luxury red */}
        <motion.path
          d="M 0,380 Q 480,330 880,380 T 1760,380"
          fill="none"
          className="stroke-luxury-red"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.8,
          }}
        />

        {/* Premium champagne route 2 */}
        <motion.path
          d="M 0,520 Q 480,570 880,520 T 1760,520"
          fill="none"
          className="stroke-champagne-light"
          strokeWidth="2.5"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
        />

        {/* Diagonal connecting route */}
        <motion.line
          x1="18%"
          y1="28%"
          x2="82%"
          y2="52%"
          className="stroke-champagne"
          strokeWidth="2"
          strokeOpacity="0.35"
          strokeDasharray="6,4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Subtle luxury grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(42 43 41) 1px, transparent 1px),
            linear-gradient(90deg, rgb(42 43 41) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Fine grain texture - luxury feel */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='5'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
