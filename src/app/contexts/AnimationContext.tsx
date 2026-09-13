import { createContext } from "react";

interface AnimationContextType {
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
}

export const AnimationContext = createContext<AnimationContextType>({
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
});
