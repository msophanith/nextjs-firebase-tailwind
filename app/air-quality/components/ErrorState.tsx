"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  readonly message: string;
  readonly tryAgainText: string;
  readonly onRetry: () => void;
}

export function ErrorState({
  message,
  tryAgainText,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <p className="text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 flex items-center gap-2 mx-auto"
      >
        <RefreshCw className="w-5 h-5" />
        {tryAgainText}
      </button>
    </div>
  );
}
