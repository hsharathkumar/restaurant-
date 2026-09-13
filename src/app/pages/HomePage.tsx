import { motion, useScroll, useTransform } from "motion/react";
import { useContext, useRef } from "react";
import { Link } from "react-router";
import { ChevronDown, Sparkles, Wine, UtensilsCrossed } from "lucide-react";
import { AnimationContext } from "../contexts/AnimationContext";
import { VideoBackground } from "../components/VideoBackground";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";

import wineImg from "../../assets/luxury_cocktail.png";
import cuisineImg from "../../assets/luxury_cuisine.png";
import ambianceImg from "../../assets/luxury_ambiance.png";
import craftedImg from "../../assets/restaurant_crafted.png";

// Additional Asset Imports for Full Gallery Coverage
import buffetImg from "../../assets/10-Best-Pocket-Friendly-Buffet-Restaurants-In-Hyderabad.jpg";
import capitalImg from "../../assets/22 1capital-multi-cuisine-restaurant-hyderguda-basheer-bagh-hyderabad-multicuisine-restaurants-v8yuiqno89.avif";
import img22 from "../../assets/22 images.jpg";
import cock2Img from "../../assets/2cock images.jpg";
import cockImg from "../../assets/cock images.jpg";
import dessertJpg from "../../assets/dessert images.jpg";
import rsImg from "../../assets/rs images.jpg";
import wineArt from "../../assets/wine_art.png";
import cuisineArt from "../../assets/cuisine_art.png";
import ambianceArt from "../../assets/ambiance_art.png";

export function HomePage() {
  const { animationsEnabled } = useContext(AnimationContext);
  const heroRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const galleryItems = [
    { src: craftedImg, title: "Master Craftsmanship", subtitle: "Artisanal Preparation" },
    { src: capitalImg, title: "Grand Dining Hall", subtitle: "Luxury Atmosphere" },
    { src: buffetImg, title: "Executive Spread", subtitle: "Curated Selection" },
    { src: cock2Img, title: "Signature Spirits", subtitle: "Crafted Mixology" },
    { src: cockImg, title: "Midnight Cocktails", subtitle: "Botanical Infusions" },
    { src: img22, title: "Gourmet Plating", subtitle: "Culinary Art" },
    { src: dessertJpg, title: "Sweet Symphony", subtitle: "Artisanal Desserts" },
    { src: rsImg, title: "Intimate Lounges", subtitle: "Atmospheric Lighting" },
    { src: wineArt, title: "Sommelier Cellar", subtitle: "Fine Vintages" },
    { src: cuisineArt, title: "Haute Cuisine", subtitle: "Michelin Inspiration" },
    { src: ambianceArt, title: "Nocturne Haven", subtitle: "Sophisticated Elegance" },
  ];

  return (
    <PageTransition>
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        <VideoBackground variant="ambiance" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="font-serif mb-6"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: "1.1",
                fontWeight: "300",
                letterSpacing: "0.02em",
              }}
            >
              Taste the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                Motion
              </span>
              .
              <br />
              Feel the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-600">
                Night
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg text-white/60 mb-12 max-w-2xl mx-auto tracking-wide"
            >
              An immersive dining experience where culinary artistry meets atmospheric elegance
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex gap-6 justify-center items-center"
            >
              <Link to="/reservations">
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-8 py-6 shadow-lg shadow-amber-500/20"
                >
                  <motion.span
                    animate={
                      animationsEnabled
                        ? {
                            boxShadow: [
                              "0 0 20px rgba(212, 175, 55, 0.5)",
                              "0 0 40px rgba(212, 175, 55, 0.8)",
                              "0 0 20px rgba(212, 175, 55, 0.5)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0"
                  />
                  <span className="relative z-10 tracking-wider">Reserve a Table</span>
                </Button>
              </Link>

              <Link to="/menu">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 px-8 py-6"
                >
                  <span className="tracking-wider">Explore Menu</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={animationsEnabled ? { y: [0, 10, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* The Experience - Scroll-Triggered Section */}
      <section ref={experienceRef} className="relative min-h-screen flex items-center py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Image Container */}
          <motion.div
            style={animationsEnabled ? { opacity, scale } : {}}
            className="relative aspect-[3/4] rounded-lg overflow-hidden group"
          >
            <img 
              src={craftedImg} 
              alt="Chef crafting with precision" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-amber-500/20 rounded-lg pointer-events-none" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            style={animationsEnabled ? { opacity } : {}}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span className="text-sm tracking-widest text-amber-400/80 uppercase">
                  The Experience
                </span>
              </div>
              
              <h2 className="font-serif text-5xl mb-6">
                Crafted with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Precision
                </span>
              </h2>
              
              <p className="text-white/60 leading-relaxed text-lg mb-6">
                Every cocktail tells a story. Every dish is a masterpiece. Our artisans blend 
                traditional techniques with modern innovation to create unforgettable moments.
              </p>

              <p className="text-white/60 leading-relaxed text-lg">
                Step into an atmosphere where dim lighting dances with golden hues, 
                where conversation flows as smoothly as our signature spirits, and where 
                every visit becomes a cherished memory.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl mb-4">
              Why{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Nocturne
              </span>
            </h2>
            <p className="text-white/50 text-lg">Where every detail matters</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Wine,
                title: "Curated Cocktails",
                description: "Award-winning mixologists crafting signature drinks that push boundaries",
                image: wineImg,
              },
              {
                icon: UtensilsCrossed,
                title: "Exquisite Cuisine",
                description: "Locally sourced ingredients transformed into culinary art",
                image: cuisineImg,
              },
              {
                icon: Sparkles,
                title: "Atmospheric Ambiance",
                description: "A space designed for intimacy, celebration, and everything between",
                image: ambianceImg,
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative p-8 bg-zinc-900/50 border border-amber-500/10 rounded-lg backdrop-blur-sm group overflow-hidden transition-all hover:border-amber-500/30"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover grayscale mix-blend-overlay" />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6 text-amber-400 group-hover:scale-110 transition-transform origin-left">
                    <feature.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4 text-white/90">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.description}</p>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-amber-500/0 group-hover:to-transparent rounded-lg transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atmospheric Gallery Section - Showcasing All Assets */}
      <section className="relative py-28 bg-black/60 border-t border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500/80 mb-2 block">
              Visual Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">
              The Nocturne <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Gallery</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-square rounded-lg overflow-hidden group border border-white/10 hover:border-amber-500/40 transition-all shadow-lg"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-medium">
                    {item.subtitle}
                  </span>
                  <h4 className="text-sm font-serif text-white font-semibold">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <VideoBackground variant="food" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-6xl mb-6">
              Begin Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                Journey
              </span>
            </h2>
            <p className="text-xl text-white/60 mb-12">
              Limited seating available. Reserve your experience today.
            </p>
            <Link to="/reservations">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-6 shadow-2xl shadow-red-500/20"
              >
                <span className="tracking-wider">Book Now</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}