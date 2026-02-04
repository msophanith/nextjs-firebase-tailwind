"use client";

import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  BOTTLE_VARIANTS,
  PACK_OPTIONS,
  BottleSize,
  PackSize,
  PackOption,
  ProductVariant,
} from "@/app/water/constants";

interface ProductSelectorProps {
  selectedSize: BottleSize;
  setSelectedSize: (size: BottleSize) => void;
  selectedPack: PackSize;
  setSelectedPack: (pack: PackSize) => void;
  currentPack: PackOption;
  finalPrice: number;
  basePrice: number;
  addToCart: () => void;
  customQuantity: number;
  setCustomQuantity: (qty: number) => void;
}

export function ProductSelector({
  selectedSize,
  setSelectedSize,
  selectedPack,
  setSelectedPack,
  currentPack,
  finalPrice,
  basePrice,
  addToCart,
  customQuantity,
  setCustomQuantity,
}: ProductSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Size Selector */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
          Select Size
        </Label>
        <div className="flex flex-wrap gap-3">
          {BOTTLE_VARIANTS.map((variant) => (
            <button
              key={variant.size}
              onClick={() => setSelectedSize(variant.size)}
              className={`
                px-4 py-2 lg:px-6 lg:py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 text-sm lg:text-base
                ${
                  selectedSize === variant.size
                    ? "border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                }
              `}
            >
              <span className="font-medium">{variant.size}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pack Selector */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
          Select Pack
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3">
          {PACK_OPTIONS.map((pack) => (
            <button
              key={pack.label}
              onClick={() => setSelectedPack(pack.label)}
              className={`
                relative px-2 py-2 lg:px-4 lg:py-3 rounded-xl border-2 transition-all duration-200 text-center
                ${
                  selectedPack === pack.label
                    ? "border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                }
              `}
            >
              {pack.discount > 0 && (
                <span className="absolute -top-2 lg:-top-2.5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] lg:text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  SAVE {pack.discount * 100}%
                </span>
              )}
              <span className="block font-medium text-xs lg:text-sm">
                {pack.label}
              </span>
              <span className="block text-[10px] lg:text-xs opacity-70 mt-0.5">
                {pack.count} bottles
              </span>
            </button>
          ))}

          <button
            onClick={() => setSelectedPack("Custom")}
            className={`
              relative px-2 py-2 lg:px-4 lg:py-3 rounded-xl border-2 transition-all duration-200 text-center
              ${
                selectedPack === "Custom"
                  ? "border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm"
                  : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50"
              }
            `}
          >
            <span className="block font-medium text-xs lg:text-sm">Custom</span>
            <span className="block text-[10px] lg:text-xs opacity-70 mt-0.5">
              Any Qty
            </span>
          </button>
        </div>

        {/* Custom Quantity Input */}
        {selectedPack === "Custom" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="pt-2"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-slate-700">
                Quantity:
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setCustomQuantity(Math.max(1, customQuantity - 1))
                  }
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-lg">
                  {customQuantity}
                </span>
                <button
                  onClick={() => setCustomQuantity(customQuantity + 1)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 ml-1">
              *Bulk discounts apply automatically: 6+ (10%), 12+ (20%)
            </p>
          </motion.div>
        )}
      </div>

      <Separator />

      {/* Price & Action */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">
              Total Amount
            </p>
            <div className="flex items-baseline gap-2">
              <motion.span
                key={finalPrice}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-slate-900 tracking-tight"
              >
                ${finalPrice.toFixed(2)}
              </motion.span>
              {currentPack.discount > 0 && (
                <span className="text-lg text-slate-400 line-through decoration-2 decoration-red-300">
                  ${basePrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              ${(finalPrice / currentPack.count).toFixed(2)} per bottle
            </p>
          </div>

          {currentPack.discount > 0 && (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
              {currentPack.discount * 100}% OFF
            </div>
          )}
        </div>

        <Button
          size="lg"
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-200 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
