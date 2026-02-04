"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PaymentForm({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate random success/failure (mostly success for demo)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      setStatus("success");
      setTimeout(onSuccess, 1500);
    } else {
      setStatus("error");
      setError("Card declined. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Payment Successful!
        </h3>
        <p className="text-slate-500 mt-2">Your order has been confirmed.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">Total Amount</span>
          <span className="text-xl font-bold text-slate-900">
            ${amount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Lock className="w-3 h-3" />
          Secure 256-bit SSL Encrypted
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="card-name">Cardholder Name</Label>
        <Input
          id="card-name"
          placeholder="John Doe"
          required
          disabled={status === "processing"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <Input
            id="card-number"
            className="pl-9 font-mono"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            required
            disabled={status === "processing"}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            maxLength={5}
            required
            disabled={status === "processing"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder="123"
            maxLength={3}
            required
            disabled={status === "processing"}
            type="password"
          />
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="pt-4 flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
          disabled={status === "processing"}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={status === "processing"}
        >
          {status === "processing" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
}
