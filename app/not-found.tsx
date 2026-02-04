"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* 404 Visual */}
          <div className="relative inline-block">
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <h1 className="text-[12rem] font-black leading-none tracking-tighter text-slate-900/5 select-none">
                404
              </h1>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl shadow-primary/20 flex items-center justify-center border border-slate-100">
                <Ghost className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Lost in the Digital Void?
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-md mx-auto">
              The page you're looking for has vanished into thin air. It might
              have been moved, deleted, or never existed in the first place.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 font-bold text-base shadow-xl shadow-primary/10 gap-2 group min-w-[200px]">
                <Home className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="bg-white border-slate-200 hover:bg-slate-50 rounded-2xl h-14 px-8 font-bold text-base text-slate-700 gap-2 min-w-[200px]"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>

          {/* Search Suggestion */}
          <div className="pt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Try searching for something else
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"
      />
    </div>
  );
}
