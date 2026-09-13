import { motion } from "motion/react";
import { useContext } from "react";
import { AnimationContext } from "../contexts/AnimationContext";

interface VideoBackgroundProps {
  variant?: "cocktails" | "food" | "ambiance";
  className?: string;
}

export function VideoBackground({ variant = "ambiance", className = "" }: VideoBackgroundProps) {
  const { animationsEnabled } = useContext(AnimationContext);

  const gradients = {
    cocktails: "from-purple-900/20 via-pink-900/20 to-amber-900/20",
    food: "from-orange-900/20 via-red-900/20 to-amber-900/20",
    ambiance: "from-slate-900/20 via-zinc-900/20 to-neutral-900/20",
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Simulated video background with animated gradients */}
      <motion.div
        animate={
          animationsEnabled
            ? {
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
                ],
              }
            : {}
        }
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />
      
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]}`} />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
    </div>
  );
}
