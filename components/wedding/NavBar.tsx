import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

interface NavBarProps {
  scrolled: boolean;
}

export default function NavBar({ scrolled }: NavBarProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-between items-center px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div
        className="text-xl font-bold text-[#8B0000]"
        style={{ fontFamily: "Great Vibes, cursive" }}
      >
        S & D
      </div>

      {/* Cool Animated Language Switcher */}
      <div
        className={cn(
          "relative flex items-center p-1 rounded-full border transition-all duration-500 group",
          scrolled
            ? "bg-white/40 border-[#8B0000]/10 shadow-inner"
            : "bg-white/10 border-white/20 backdrop-blur-md"
        )}
      >
        <div className="relative flex items-center gap-1">
          {/* Sliding Pill */}
          <motion.div
            className={cn(
              "absolute h-full rounded-full shadow-md",
              scrolled ? "bg-[#8B0000]" : "bg-white"
            )}
            initial={false}
            animate={{
              x: language === "en" ? 0 : 44,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ width: "44px", height: "32px" }}
          />

          {/* EN Button */}
          <button
            onClick={() => setLanguage("en")}
            className={cn(
              "relative z-10 w-11 h-8 text-[11px] font-bold tracking-widest transition-colors duration-500 flex items-center justify-center rounded-full",
              language === "en"
                ? scrolled
                  ? "text-white"
                  : "text-[#8B0000]"
                : scrolled
                ? "text-[#8B0000]/40 hover:text-[#8B0000]/70"
                : "text-white/40 hover:text-white/70"
            )}
          >
            EN
          </button>

          {/* KH Button */}
          <button
            onClick={() => setLanguage("kh")}
            className={cn(
              "relative z-10 w-11 h-8 text-[11px] font-bold tracking-widest transition-colors duration-500 flex items-center justify-center rounded-full",
              language === "kh"
                ? scrolled
                  ? "text-white"
                  : "text-[#8B0000]"
                : scrolled
                ? "text-[#8B0000]/40 hover:text-[#8B0000]/70"
                : "text-white/40 hover:text-white/70"
            )}
          >
            ខ្មែរ
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
