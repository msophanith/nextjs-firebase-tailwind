"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  BOTTLE_VARIANTS,
  PACK_OPTIONS,
  BottleSize,
  PackSize,
  CartItem,
} from "@/app/water/constants";
import { CartSheet } from "@/components/water/cart-sheet";
import { BottleVisual } from "@/components/water/bottle-visual";
import { ProductSelector } from "@/components/water/product-selector";
import { MineralAnalysis } from "@/components/water/mineral-analysis";

export default function WaterShopPage() {
  const [selectedSize, setSelectedSize] = useState<BottleSize>("500ml");
  const [selectedPack, setSelectedPack] = useState<PackSize>("Single");
  const [customQuantity, setCustomQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem("water-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on change
  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("water-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Calculate current price
  const currentVariant = BOTTLE_VARIANTS.find((v) => v.size === selectedSize)!;

  let currentPack = PACK_OPTIONS.find((p) => p.label === selectedPack);

  // Handle Custom Pack Logic
  if (selectedPack === "Custom" || !currentPack) {
    const discount = customQuantity >= 12 ? 0.2 : customQuantity >= 6 ? 0.1 : 0;
    currentPack = {
      label: "Custom",
      count: customQuantity,
      discount: discount,
    };
  }

  const basePrice = currentVariant.price * currentPack.count;
  const discountAmount = basePrice * currentPack.discount;
  const finalPrice = basePrice - discountAmount;

  const addToCart = () => {
    const newItem: CartItem = {
      id: `${selectedSize}-${selectedPack}-${Date.now()}`,
      size: selectedSize,
      pack: selectedPack,
      quantity: 1,
      pricePerUnit: finalPrice,
      totalPrice: finalPrice,
    };

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.size === selectedSize && item.pack === selectedPack,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.pricePerUnit,
              }
            : item,
        );
      }
      return [...prev, newItem];
    });

    toast({
      title: "Added to cart",
      description: `${selectedSize} ${selectedPack} added.`,
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.pricePerUnit,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-1.5 rounded-lg">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              AquaPure
            </span>
          </div>

          <CartSheet
            cart={cart}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative order-2 lg:order-1"
          >
            <BottleVisual selectedSize={selectedSize} />
          </motion.div>

          {/* Right: Details & Selection */}
          <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Premium Mineral Water
              </motion.div>
              <h1 className="text-3xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                Pure Hydration,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Naturally Sourced.
                </span>
              </h1>
              <p className="text-base lg:text-lg text-slate-600 max-w-md leading-relaxed">
                Sourced from the pristine alpine springs, AquaPure delivers the
                perfect balance of minerals for your daily hydration needs.
              </p>

              <div className="pt-2">
                <MineralAnalysis />
              </div>
            </div>

            <ProductSelector
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedPack={selectedPack}
              setSelectedPack={setSelectedPack}
              currentPack={currentPack}
              finalPrice={finalPrice}
              basePrice={basePrice}
              addToCart={addToCart}
              customQuantity={customQuantity}
              setCustomQuantity={setCustomQuantity}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
