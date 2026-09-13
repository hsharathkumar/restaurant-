import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { Preloader } from "../components/Preloader";
import { Navbar } from "../components/Navbar";
import { ScrollProgress } from "../components/ScrollProgress";
import { Footer } from "../components/Footer";
import { AnimationContext } from "../contexts/AnimationContext";

export function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimationContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      <div className="dark min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
        {isLoading && <Preloader />}
        <ScrollProgress />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </AnimationContext.Provider>
  );
}