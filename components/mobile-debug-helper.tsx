"use client";

import { useEffect, useState } from "react";

/**
 * Mobile Debug Helper
 * Shows environment and config status on mobile devices
 * Only visible in development or when explicitly enabled
 */
export function MobileDebugHelper() {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    // Show debug info if in development or if ?debug=true is in URL
    const isDev = process.env.NODE_ENV === "development";
    const hasDebugParam =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("debug") === "true";

    if (isDev || hasDebugParam) {
      setShow(true);
      setInfo({
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio,
        },
        userAgent: navigator.userAgent,
        firebaseConfigured: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        online: navigator.onLine,
        env: process.env.NODE_ENV,
      });
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] max-w-xs">
      <details className="bg-black/90 text-white text-xs p-3 rounded-lg border border-white/20 backdrop-blur-xl">
        <summary className="cursor-pointer font-bold mb-2">
          [DEBUG] Info
        </summary>
        <div className="space-y-1 font-mono text-[10px]">
          <div>
            <strong>Viewport:</strong> {info.viewport?.width}x
            {info.viewport?.height}
          </div>
          <div>
            <strong>DPR:</strong> {info.viewport?.devicePixelRatio}
          </div>
          <div>
            <strong>Firebase:</strong>{" "}
            {info.firebaseConfigured ? "[OK] Configured" : "[X] Missing"}
          </div>
          <div>
            <strong>Online:</strong> {info.online ? "[OK] Yes" : "[X] No"}
          </div>
          <div>
            <strong>Env:</strong> {info.env}
          </div>
          <div className="pt-2 text-yellow-400">
            <strong>User Agent:</strong>
            <div className="break-all">{info.userAgent}</div>
          </div>
        </div>
      </details>
    </div>
  );
}
