/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from "./assets/vite.svg"
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
      
      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

//export default App
*/
import React, { Component, ErrorInfo, ReactNode } from 'react';

// ==========================================
// 1. ERROR BOUNDARY COMPONENT
// ==========================================
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by App ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0f0f0f',
          color: '#e5c158',
          fontFamily: 'serif',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ color: '#ccc', maxWidth: '500px', marginBottom: '2rem' }}>
            We encountered an unexpected error while loading the page. Please try refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e5c158',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ==========================================
// 2. MAIN APP COMPONENT
// ==========================================
export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-amber-50 font-sans selection:bg-amber-500 selection:text-black">
        {/* Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-900/30">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-serif tracking-widest text-amber-400">
              L'ÉTOILE <span className="text-xs uppercase block text-amber-200/60 tracking-normal">Bar & Dining</span>
            </div>
            <ul className="hidden md:flex space-x-8 text-sm uppercase tracking-wider text-amber-100/80">
              <li className="hover:text-amber-400 cursor-pointer transition">About</li>
              <li className="hover:text-amber-400 cursor-pointer transition">Menu</li>
              <li className="hover:text-amber-400 cursor-pointer transition">Mixology</li>
              <li className="hover:text-amber-400 cursor-pointer transition">Reservations</li>
            </ul>
            <button className="px-5 py-2 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition text-sm uppercase tracking-wider font-semibold rounded">
              Book Table
            </button>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="pt-24">
          <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
            <div className="max-w-3xl">
              <span className="text-amber-400 uppercase tracking-widest text-sm font-semibold mb-4 block">
                Exquisite Culinary & Cocktail Experience
              </span>
              <h1 className="text-5xl md:text-7xl font-serif tracking-wide mb-6 text-amber-100">
                Where Elegance Meets Taste
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl mb-8 leading-relaxed">
                Indulge in artisanal mixology, curated fine dining, and an opulent atmosphere crafted for unforgettable evenings.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="#menu"
                  className="px-8 py-3 bg-amber-500 text-black font-semibold rounded uppercase tracking-wider text-sm hover:bg-amber-400 transition"
                >
                  View Menu
                </a>
                <a
                  href="#reservations"
                  className="px-8 py-3 border border-zinc-700 text-amber-100 rounded uppercase tracking-wider text-sm hover:border-amber-400 transition"
                >
                  Reservations
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-12 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} L'ÉTOILE Luxury Bar & Restaurant. All rights reserved.</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}