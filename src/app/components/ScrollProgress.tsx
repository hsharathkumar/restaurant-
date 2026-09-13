import { motion, useScroll, useSpring } from "motion/react";
import { useContext } from "react";
import { AnimationContext } from "../contexts/AnimationContext";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { animationsEnabled } = useContext(AnimationContext);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!animationsEnabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-red-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}
