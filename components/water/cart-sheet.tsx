"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  Droplets,
  Trash2,
  Truck,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { CartItem } from "@/app/water/constants";
import { PaymentForm } from "@/components/water/payment-form";
import { motion, AnimatePresence } from "framer-motion";

interface CartSheetProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 50;

export function CartSheet({ cart, updateQuantity, clearCart }: CartSheetProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cartTotal,
  );
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = () => {
    if (!promoCode) return;
    toast({
      title: "Promo Code Applied",
      description: "Discount will be calculated at checkout.",
    });
    setPromoCode("");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-blue-50"
        >
          <ShoppingBag className="w-5 h-5 text-slate-700" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md h-full">
        <SheetHeader className="space-y-4 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <SheetTitle>Your Cart ({cartCount})</SheetTitle>
            {cart.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2 text-xs"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Truck className="w-4 h-4 text-blue-500" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add{" "}
                  <span className="text-blue-600">
                    ${remainingForFreeShipping.toFixed(2)}
                  </span>{" "}
                  for free shipping
                </span>
              ) : (
                <span className="text-green-600">
                  You've unlocked free shipping!
                </span>
              )}
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 opacity-20" />
              </div>
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Start adding some hydration!</p>
            </div>
          ) : (
            <div className="space-y-6 py-6">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                      <Droplets className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-semibold text-slate-900 truncate">
                            Mineral Water
                          </h4>
                          <p className="text-sm text-slate-500">
                            {item.size} • {item.pack}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, -item.quantity)
                          }
                          className="text-xs text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>

        <div className="pt-4 border-t border-slate-100 bg-white space-y-4">
          {/* Promo Code */}
          {cart.length > 0 && (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Promo Code"
                  className="pl-9 h-9 text-sm"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                className="h-9"
              >
                Apply
              </Button>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-slate-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Shipping</span>
              {remainingForFreeShipping > 0 ? (
                <span className="font-medium text-slate-900">$5.00</span>
              ) : (
                <span className="font-medium text-green-600">Free</span>
              )}
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="font-bold text-lg text-slate-900">Total</span>
              <span className="font-bold text-2xl text-slate-900">
                $
                {(cartTotal + (remainingForFreeShipping > 0 ? 5 : 0)).toFixed(
                  2,
                )}
              </span>
            </div>
          </div>

          <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full h-12 text-base bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200"
                disabled={cart.length === 0}
              >
                Checkout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Secure Checkout</DialogTitle>
              </DialogHeader>
              <PaymentForm
                amount={cartTotal + (remainingForFreeShipping > 0 ? 5 : 0)}
                onSuccess={() => {
                  clearCart();
                  setIsCheckoutOpen(false);
                  setIsCartOpen(false);
                  toast({
                    title: "Order Confirmed",
                    description: "We've sent a receipt to your email.",
                  });
                }}
                onCancel={() => setIsCheckoutOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </SheetContent>
    </Sheet>
  );
}
