import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const NeonButton = ({
  children,
  primary = true,
  className = "",
  onClick,
  isLoading = false,
  disabled = false,
}) => {
  const primaryColors = {
    bg: "bg-indigo-600",
    hoverBg: "hover:bg-indigo-700",
    text: "text-white",
    glow: "0 0 20px 4px rgba(79, 70, 229, 0.7), 0 0 40px 1px rgba(79, 70, 229, 0.4)",
    innerGlow: "from-indigo-400 via-violet-300 to-indigo-400",
    particleColor: "rgba(238, 242, 255, 0.9)",
  };

  const secondaryColors = {
    bg: "bg-transparent",
    border: "border-2 border-white",
    text: "text-white",
    hoverBg: "hover:bg-white/10",
    hoverText: "hover:text-white",
    glow: "0 0 20px 4px rgba(255, 255, 255, 0.5), 0 0 40px 1px rgba(255, 255, 255, 0.2)",
    innerGlow: "from-white/0 via-white/40 to-white/0",
    particleColor: "rgba(255, 255, 255, 0.7)",
  };

  const colors = primary ? primaryColors : secondaryColors;

  const [particles, setParticles] = useState([]);
  const particleIdCounter = useRef(0);

  const addParticlesOnClick = (event) => {
    if (isLoading || disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const numParticles = 10 + Math.floor(Math.random() * 10);

    const newParticles = Array.from({ length: numParticles }).map(() => {
      particleIdCounter.current += 1;
      return {
        id: particleIdCounter.current,
        x: clickX,
        y: clickY,
        angle: Math.random() * 360,
        spread: 30 + Math.random() * 50,
        decay: 0.5 + Math.random() * 0.5,
        size: 2 + Math.random() * 3,
      };
    });

    setParticles((currentParticles) => [...currentParticles, ...newParticles]);
  };

  const handleParticleAnimationComplete = (id) => {
    setParticles((currentParticles) =>
      currentParticles.filter((p) => p.id !== id)
    );
  };

  const internalOnClick = (event) => {
    addParticlesOnClick(event);
    if (onClick && !isLoading && !disabled) {
      onClick(event);
    }
  };

  const actualDisabled = isLoading || disabled;

  return (
    <motion.button
      className={`relative overflow-hidden font-medium py-2.5 px-6 cursor-pointer ${
        primary
          ? `${colors.bg} ${colors.text} ${
              actualDisabled ? "opacity-70" : colors.hoverBg
            }`
          : `${colors.bg} ${colors.border} ${colors.text} ${
              actualDisabled
                ? "opacity-70"
                : `${colors.hoverBg} ${colors.hoverText}`
            }`
      } rounded-lg shadow-lg transition-all duration-300 ${className} ${
        actualDisabled ? "cursor-not-allowed" : ""
      }`}
      whileHover={
        !actualDisabled
          ? {
              boxShadow: colors.glow,
              transition: { duration: 0.2 },
            }
          : {}
      }
      whileTap={
        !actualDisabled
          ? {
              scale: 0.97,
              boxShadow: colors.glow,
            }
          : {}
      }
      initial={{
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      }}
      onClick={internalOnClick}
      disabled={actualDisabled}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: colors.particleColor,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos(p.angle * (Math.PI / 180)) * p.spread,
                y: Math.sin(p.angle * (Math.PI / 180)) * p.spread,
                opacity: 0,
                scale: 0.5,
              }}
              transition={{ duration: p.decay, ease: "easeOut" }}
              onAnimationComplete={() => handleParticleAnimationComplete(p.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colors.innerGlow} opacity-0 z-0`}
        initial={{ x: "-110%" }}
        whileHover={
          !actualDisabled
            ? {
                x: "110%",
                opacity: 0.4,
                transition: {
                  duration: 0.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0.2,
                },
              }
            : {}
        }
      />
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colors.innerGlow} opacity-0 z-0`}
        animate={
          !actualDisabled
            ? {
                opacity: [0, 0.15, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                },
              }
            : {}
        }
      />

      <div className="relative z-10 flex items-center justify-center space-x-2 font-medium tracking-wide">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={children ? 18 : 24} />
            {children && <span>Cargando...</span>}{" "}
          </>
        ) : (
          children
        )}
      </div>
    </motion.button>
  );
};

export default NeonButton;
