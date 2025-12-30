"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { CameraOff, RefreshCw } from "lucide-react";

interface ScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

export function Scanner({ onScanSuccess, onScanError }: ScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const hasScannedRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const scannerId = "reader";

  const startScanner = async () => {
    if (isTransitioningRef.current) return;

    try {
      isTransitioningRef.current = true;

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(scannerId);
      }

      // If already scanning, stop first (shouldn't happen with our logic but for safety)
      if (html5QrCodeRef.current.isScanning) {
        await html5QrCodeRef.current.stop();
      }

      const config = {
        fps: 10,
        // qrbox: { width: 250, height: 250 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.CODE_128,
        ],
      };

      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          if (hasScannedRef.current) return;
          hasScannedRef.current = true;

          // Stop scanning immediately to prevent multiple triggers
          await stopScanner();
          onScanSuccess(decodedText);
        },
        (errorMessage) => {
          // Ignore frequent errors like "No QR code found"
          if (onScanError && !errorMessage.includes("NotFoundException")) {
            onScanError(errorMessage);
          }
        }
      );
      setIsScanning(true);
      setHasPermission(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      setHasPermission(false);
      setIsScanning(false);
    } finally {
      isTransitioningRef.current = false;
    }
  };

  const stopScanner = async () => {
    // If already transitioning, we might be in the middle of a stop or start
    // We'll wait a bit or just return if we're already stopping
    if (isTransitioningRef.current) {
      // If we're already transitioning, we should probably wait or check state
      // But for simplicity, we'll just return if we're not scanning
      if (html5QrCodeRef.current && !html5QrCodeRef.current.isScanning) return;
    }

    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        isTransitioningRef.current = true;
        await html5QrCodeRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      } finally {
        isTransitioningRef.current = false;
      }
    }
  };

  useEffect(() => {
    startScanner();
    return () => {
      // Use a separate flag to ensure we don't try to stop multiple times during unmount
      const cleanup = async () => {
        await stopScanner();
      };
      cleanup();
    };
  }, []);

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-2xl border border-red-100 text-center space-y-4">
        <div className="p-3 bg-red-100 rounded-full">
          <CameraOff className="h-8 w-8 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-900">
            Camera Access Denied
          </h3>
          <p className="text-sm text-red-700 mt-1">
            Please enable camera permissions in your browser settings to scan
            products.
          </p>
        </div>
        <Button onClick={startScanner} variant="outline" className="bg-white">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Scanner Container */}
      <div className="relative overflow-hidden rounded-3xl bg-black aspect-square shadow-2xl border-4 border-white/10">
        <div id={scannerId} className="w-full h-full"></div>

        {/* Overlay UI */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
          {/* Scanning Frame */}
          <div className="w-64 h-64 border-2 border-blue-500/50 rounded-2xl relative">
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>

            {/* Scanning Line Animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-scan"></div>
          </div>

          <div className="mt-8 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
            <p className="text-white text-xs font-medium tracking-wider uppercase">
              Align code within frame
            </p>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute -top-3 -right-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full shadow-lg animate-pulse">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          LIVE
        </div>
      </div>
    </div>
  );
}
