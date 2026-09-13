import { motion } from "motion/react";
import { useState, useContext, useEffect } from "react";
import { Wine, UtensilsCrossed, Coffee, Sparkles, Loader2 } from "lucide-react";
import { AnimationContext } from "../contexts/AnimationContext";
import { PageTransition } from "../components/PageTransition";
import { getMenu, getFoodImageUrl, APIMenuItem } from "../services/awsService";


import appetizerArt from "../../assets/appetizer.png";
import mainArt from "../../assets/main.png";
import cocktailArt from "../../assets/cocktail.png";
import dessertArt from "../../assets/dessert.png";

import luxuryAppetizer from "../../assets/luxury_appetizer.png";
import luxuryCuisine from "../../assets/luxury_cuisine.png";
import luxuryCocktail from "../../assets/luxury_cocktail.png";
import luxuryDessert from "../../assets/luxury_dessert.png";

import buffetImg from "../../assets/10-Best-Pocket-Friendly-Buffet-Restaurants-In-Hyderabad.jpg";
import capitalImg from "../../assets/22 1capital-multi-cuisine-restaurant-hyderguda-basheer-bagh-hyderabad-multicuisine-restaurants-v8yuiqno89.avif";
import img22 from "../../assets/22 images.jpg";
import cock2Img from "../../assets/2cock images.jpg";
import cockImg from "../../assets/cock images.jpg";
import dessertJpg from "../../assets/dessert images.jpg";

const categoryImages = {
  appetizers: luxuryAppetizer,
  mains: luxuryCuisine,
  cocktails: luxuryCocktail,
  desserts: luxuryDessert,
};

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "appetizers" | "mains" | "cocktails" | "desserts";
  itemImage?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Seared Scallops",
    description: "Pan-seared scallops with truffle beurre blanc, microgreens",
    price: "$28",
    category: "appetizers",
    itemImage: luxuryAppetizer,
  },
  {
    id: "2",
    name: "Wagyu Tartare",
    description: "Hand-cut wagyu, quail egg, crispy shallots, black garlic aioli",
    price: "$32",
    category: "appetizers",
    itemImage: appetizerArt,
  },
  {
    id: "3",
    name: "Burrata & Heirloom Tomato",
    description: "Creamy burrata, heirloom tomatoes, aged balsamic, basil oil",
    price: "$24",
    category: "appetizers",
    itemImage: img22,
  },
  {
    id: "4",
    name: "Ribeye 14oz",
    description: "Dry-aged ribeye, roasted bone marrow, charred broccolini",
    price: "$68",
    category: "mains",
    itemImage: mainArt,
  },
  {
    id: "5",
    name: "Chilean Sea Bass",
    description: "Miso-glazed sea bass, forbidden rice, yuzu beurre blanc",
    price: "$56",
    category: "mains",
    itemImage: luxuryCuisine,
  },
  {
    id: "6",
    name: "Duck Confit",
    description: "Slow-cooked duck leg, cherry reduction, creamy polenta",
    price: "$48",
    category: "mains",
    itemImage: capitalImg,
  },
  {
    id: "7",
    name: "Executive Grand Feast",
    description: "Multi-course curated tasting menu with wine pairings",
    price: "$85",
    category: "mains",
    itemImage: buffetImg,
  },
  {
    id: "8",
    name: "Midnight Manhattan",
    description: "Rye whiskey, sweet vermouth, black walnut bitters, luxardo cherry",
    price: "$18",
    category: "cocktails",
    itemImage: cocktailArt,
  },
  {
    id: "9",
    name: "Golden Hour",
    description: "Aged rum, saffron syrup, fresh citrus, gold leaf",
    price: "$22",
    category: "cocktails",
    itemImage: luxuryCocktail,
  },
  {
    id: "10",
    name: "Crimson Smoke",
    description: "Mezcal, hibiscus, lime, smoked salt rim",
    price: "$20",
    category: "cocktails",
    itemImage: cockImg,
  },
  {
    id: "11",
    name: "Royal Botanical Elixir",
    description: "Artisanal gin, elderflower, gold leaf flakes, botanical foam",
    price: "$24",
    category: "cocktails",
    itemImage: cock2Img,
  },
  {
    id: "12",
    name: "Chocolate Decadence",
    description: "70% dark chocolate torte, raspberry coulis, vanilla gelato",
    price: "$16",
    category: "desserts",
    itemImage: luxuryDessert,
  },
  {
    id: "13",
    name: "Crème Brûlée",
    description: "Classic vanilla bean custard, caramelized sugar, fresh berries",
    price: "$14",
    category: "desserts",
    itemImage: dessertArt,
  },
  {
    id: "14",
    name: "Artisanal Dessert Symphony",
    description: "Handcrafted patisserie selection with berry reduction",
    price: "$18",
    category: "desserts",
    itemImage: dessertJpg,
  },
];

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("appetizers");
  const { animationsEnabled } = useContext(AnimationContext);
  const [items, setItems] = useState<(MenuItem | APIMenuItem)[]>(menuItems);
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        const apiItems = await getMenu();
        if (apiItems && apiItems.length > 0) {
          const formattedItems = apiItems.map(item => ({
            ...item,
            price: item.price.startsWith('$') ? item.price : `$${item.price}`
          }));
          setItems(formattedItems);
        }
      } catch (error) {
        console.log("Using local static menu items as fallback.");
        setItems(menuItems);
      } finally {
        setMenuLoading(false);
      }
    }
    loadMenu();
  }, []);

  const categories = [
    { id: "appetizers", label: "Appetizers", icon: Sparkles },
    { id: "mains", label: "Mains", icon: UtensilsCrossed },
    { id: "cocktails", label: "Cocktails", icon: Wine },
    { id: "desserts", label: "Desserts", icon: Coffee },
  ];

  const filteredItems = items.filter((item) => item.category === activeCategory);


  return (
    <PageTransition>
      <div className="relative min-h-screen pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-6xl mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Menu
              </span>
            </h1>
            <p className="text-white/50 text-lg">A curated selection of culinary excellence</p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={animationsEnabled ? { scale: 1.05 } : {}}
                whileTap={animationsEnabled ? { scale: 0.95 } : {}}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-8 py-4 rounded-lg transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40"
                    : "bg-zinc-900/50 border border-white/5 hover:border-amber-500/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <category.icon
                    className={`w-5 h-5 ${
                      activeCategory === category.id ? "text-amber-400" : "text-white/50"
                    }`}
                  />
                  <span
                    className={`tracking-wide ${
                      activeCategory === category.id ? "text-amber-400" : "text-white/70"
                    }`}
                  >
                    {category.label}
                  </span>
                </div>

                {activeCategory === category.id && animationsEnabled && (
                  <motion.div
                    layoutId="category-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-red-500"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={animationsEnabled ? { opacity: 0, y: 30 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={animationsEnabled ? { y: -10, scale: 1.02 } : {}}
                className="group relative rounded-xl overflow-hidden bg-zinc-900/50 border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer shadow-xl shadow-black/50"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <motion.img
                    src={'imageFileName' in item && item.imageFileName ? getFoodImageUrl(item.imageFileName) : ('itemImage' in item && item.itemImage ? item.itemImage : categoryImages[item.category])}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80" />
                </div>
                
                {/* Content Section */}
                <div className="p-6 relative bg-zinc-900/80 backdrop-blur-sm h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-serif text-white/90 group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-amber-400 font-medium text-lg whitespace-nowrap ml-4">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-xl transition-all pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}