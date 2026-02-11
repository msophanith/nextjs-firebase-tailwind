"use client";

interface LoadingStateProps {
  readonly message: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-4 border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-gray-600 text-lg">{message}</p>
    </div>
  );
}
