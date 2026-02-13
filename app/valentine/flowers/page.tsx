"use client";

import { motion } from "framer-motion";
import { RosePetals } from "@/components/birthday/RosePetals";
import { FlowerSection } from "@/components/valentine/FlowerSection";
import Link from "next/link";
import { ChevronLeft, Heart } from "lucide-react";

export default function ValentineFlowersPage() {
  return (
    <div className="min-h-screen bg-[#0f0709] text-white selection:bg-pink-500/30">
      <RosePetals />

      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-900/20 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/valentine"
          className="flex items-center gap-2 text-pink-200/60 hover:text-pink-200 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Main Page</span>
        </Link>
        <div className="flex items-center gap-2 font-serif italic text-xl text-pink-300">
          <Heart className="w-5 h-5 fill-pink-500 text-pink-500 animate-pulse" />
          Valentine 2026
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium tracking-widest uppercase mb-6">
              A Special Bouquet for You
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 bg-gradient-to-b from-white via-pink-100 to-rose-300 bg-clip-text text-transparent italic">
              Virtual Flower <br className="hidden md:block" /> Garden of Love
            </h1>
            <p className="text-pink-100/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Because real flowers fade, but my love for you remains eternal.
              Each blossom here represents a piece of my heart.
            </p>
          </motion.div>
        </section>

        {/* Flower Grid Section */}
        <FlowerSection />

        {/* Footer Message */}
        <section className="py-32 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
            <h3 className="text-3xl font-serif italic mb-6 text-pink-100">
              "If I had a flower for every time I thought of you... I could walk
              through my garden forever."
            </h3>
            <p className="text-pink-300/80 font-medium">
              — Alfred Lord Tennyson
            </p>

            <motion.div
              className="mt-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/valentine"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 font-bold shadow-[0_0_20px_rgba(244,114,182,0.4)] hover:shadow-[0_0_30px_rgba(244,114,182,0.6)] transition-all"
              >
                Send Me a Message ❤️
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-10 left-10 text-pink-500/10 select-none pointer-events-none rotate-12">
        <Heart size={200} fill="currentColor" />
      </div>
      <div className="fixed top-20 right-10 text-rose-500/10 select-none pointer-events-none -rotate-12">
        <Heart size={150} fill="currentColor" />
      </div>

      <footer className="relative z-10 py-10 border-t border-white/5 text-center text-pink-200/30 text-sm">
        <p>&copy; 2026 Made with ❤️ just for you</p>
      </footer>
    </div>
  );
}
