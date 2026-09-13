import { motion } from "motion/react";
import { Link } from "react-router";
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="text-3xl font-serif mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  NOCTURNE
                </span>
              </div>
              <div className="text-xs tracking-[0.3em] text-amber-500/60 mb-4">
                BAR & RESTAURANT
              </div>
            </motion.div>
            <p className="text-white/50 max-w-md leading-relaxed mb-6">
              Where culinary excellence meets atmospheric elegance. Experience luxury dining 
              in the heart of the city.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 flex items-center justify-center text-white/50 hover:text-amber-400 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/90 font-serif mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Menu", path: "/menu" },
                { label: "Reservations", path: "/reservations" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-white/50 hover:text-amber-400 transition-colors inline-block"
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/90 font-serif mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/50">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  123 Nightfall Avenue<br />
                  Downtown District<br />
                  Metropolis, ST 12345
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/50">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/50">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">reservations@nocturne.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Nocturne Bar & Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </footer>
  );
}
