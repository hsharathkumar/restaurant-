import { motion } from "motion/react";
import { ReactNode, useContext } from "react";
import { AnimationContext } from "../contexts/AnimationContext";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { animationsEnabled } = useContext(AnimationContext);

  if (!animationsEnabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}
