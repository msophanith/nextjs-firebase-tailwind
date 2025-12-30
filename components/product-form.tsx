"use client";

import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Package, Tag, CheckCircle2, AlertCircle } from "lucide-react";

interface Product {
  barcode: string;
  name: string;
  price: number;
}

interface ProductFormProps {
  product?: Product | null;
  barcode: string;
  onSuccess: () => void;
}

export function ProductForm({ product, barcode, onSuccess }: ProductFormProps) {
  const firestore = useFirestore();
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productRef = doc(firestore, "products", barcode);
      const data = {
        name,
        price: parseFloat(price),
        barcode,
        updatedAt: serverTimestamp(),
        ...(product ? {} : { createdAt: serverTimestamp() }),
      };

      await setDoc(productRef, data, { merge: true });

      toast({
        title: product ? "Product updated" : "Product created",
        description: `${name} has been ${
          product ? "updated" : "created"
        } successfully.`,
      });

      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
          {product ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : (
            <AlertCircle className="h-3 w-3" />
          )}
          {product ? "Product Found" : "New Entry Detected"}
        </div>
        <h2 className="text-2xl font-bold text-white">
          {product ? "Update Product" : "Register Product"}
        </h2>
        <p className="text-white/40 text-sm">
          {product
            ? "Modify existing product details"
            : "Add this product to the database"}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="barcode"
            className="text-white/60 text-xs font-semibold uppercase tracking-wider"
          >
            Barcode ID
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Tag className="h-4 w-4 text-white/30" />
            </div>
            <Input
              id="barcode"
              value={barcode}
              disabled
              className="bg-white/5 border-white/10 text-white/50 pl-11 h-12 rounded-xl focus-visible:ring-blue-500/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-white/60 text-xs font-semibold uppercase tracking-wider"
          >
            Product Name
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Package className="h-4 w-4 text-white/30" />
            </div>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Organic Coffee Beans"
              required
              className="bg-white/5 border-white/10 text-white pl-11 h-12 rounded-xl focus-visible:ring-blue-500/50 placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="price"
            className="text-white/60 text-xs font-semibold uppercase tracking-wider"
          >
            Price (USD)
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 font-bold">
              $
            </div>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
              className="bg-white/5 border-white/10 text-white pl-11 h-12 rounded-xl focus-visible:ring-blue-500/50 placeholder:text-white/20"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : product ? (
          "Update Price"
        ) : (
          "Save Product"
        )}
      </Button>
    </form>
  );
}
