import { Link, useLocation } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { PauseCircle, PlayCircle, Menu, X, User, LogOut, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { AnimationContext } from "../contexts/AnimationContext";
import { useAuth } from "../contexts/AuthContext";

export function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const { animationsEnabled, setAnimationsEnabled } = useContext(AnimationContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.95)"]
  );

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/reservations", label: "Reserve" },
  ];

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-serif cursor-pointer"
          >
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              NOCTURNE
            </div>
            <div className="text-[10px] tracking-[0.2em] text-amber-500/60">
              BAR & RESTAURANT
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ y: -2 }}
                className={`relative text-sm tracking-wider transition-colors ${
                  location.pathname === item.path
                    ? "text-amber-400"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-crimson-500"
                  />
                )}
              </motion.div>
            </Link>
          ))}

          {/* Animation Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="ml-4 text-amber-400/70 hover:text-amber-400 transition-colors mr-2"
            title={animationsEnabled ? "Pause Animations" : "Play Animations"}
          >
            {animationsEnabled ? (
              <PauseCircle className="w-5 h-5" />
            ) : (
              <PlayCircle className="w-5 h-5" />
            )}
          </motion.button>

          {/* Authentication State */}
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-amber-500/70" />
          ) : isAuthenticated && user ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm tracking-wider text-amber-400 hover:text-amber-300 transition-colors bg-white/5 border border-amber-500/20 px-4 py-2 rounded-full cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[120px] truncate">{user.username || user.email?.split('@')[0] || "Profile"}</span>
              </motion.button>
              
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-2 w-56 bg-zinc-950 border border-amber-500/20 rounded-lg shadow-xl py-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-medium text-white/95 truncate">{user.email || user.username}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={login}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/10"
            >
              Sign In
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="text-amber-400/70 hover:text-amber-400 transition-colors"
            title={animationsEnabled ? "Pause Animations" : "Play Animations"}
          >
            {animationsEnabled ? (
              <PauseCircle className="w-5 h-5" />
            ) : (
              <PlayCircle className="w-5 h-5" />
            )}
          </motion.button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/70 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`text-base py-2 transition-colors ${
                      location.pathname === item.path
                        ? "text-amber-400"
                        : "text-white/70"
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}

              {/* Mobile Auth Items */}
              <div className="pt-4 border-t border-white/5">
                {isLoading ? (
                  <div className="flex items-center gap-2 py-2 text-white/40">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                    <span>Checking status...</span>
                  </div>
                ) : isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm text-amber-400 font-medium truncate">{user.email || user.username}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left py-2 text-base text-red-400 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4.5 h-4.5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      login();
                    }}
                    className="w-full text-left py-2 text-base text-amber-400 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <User className="w-4.5 h-4.5" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}