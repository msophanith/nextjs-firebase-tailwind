"use client";

import { useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { Scanner } from "@/components/scanner";
import { ProductForm } from "@/components/product-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ScanLine, History, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  barcode: string;
  name: string;
  price: number;
}

export default function ScannerPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [autoDetect, setAutoDetect] = useState(true);
  const [scanHistory, setScanHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const isProcessingRef = useRef(false);

  const handleScanSuccess = async (barcode: string) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setIsScanning(false);
    setScannedCode(barcode);
    setLoading(true);

    // Add to scan history
    setScanHistory((prev) => {
      const newHistory = [barcode, ...prev.filter((b) => b !== barcode)].slice(
        0,
        10
      );
      return newHistory;
    });

    try {
      const productRef = doc(firestore, "products", barcode);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct(productSnap.data() as Product);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScannedCode(null);
    setProduct(null);
    setIsScanning(true);
    isProcessingRef.current = false;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>
      </div>

      <header className="relative z-10 px-6 py-6 flex items-center justify-between backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-white/10 text-white"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold tracking-tight">Scanner</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-medium text-white/50 uppercase tracking-widest">
              System Active
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white/10 text-white relative"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="h-5 w-5" />
            {scanHistory.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {scanHistory.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* History Panel */}
      {showHistory && (
        <div className="fixed top-20 right-4 z-50 w-80 max-h-96 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Scan History
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScanHistory([])}
              className="text-xs text-white/60 hover:text-white"
            >
              Clear All
            </Button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {scanHistory.length === 0 ? (
              <div className="p-8 text-center text-white/40 text-sm">
                No scan history yet
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {scanHistory.map((code, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleScanSuccess(code);
                      setShowHistory(false);
                    }}
                    className="w-full p-3 text-left rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono text-white/80 group-hover:text-white">
                        {code}
                      </span>
                      <span className="text-[10px] text-white/40">
                        #{index + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <main className="relative z-10 max-w-md mx-auto p-6 space-y-8">
        {/* Auto-Detection Toggle */}
        <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                autoDetect
                  ? "bg-green-500/20 text-green-400"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              <ScanLine size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Auto-Detection</p>
              <p className="text-xs text-white/50">
                Scan automatically when detected
              </p>
            </div>
          </div>
          <button
            onClick={() => setAutoDetect(!autoDetect)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              autoDetect ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                autoDetect ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {isScanning ? (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">Scan Product</h2>
              <p className="text-white/60 text-sm">
                Position the barcode inside the frame
              </p>
            </div>

            <div className="relative">
              <Scanner onScanSuccess={handleScanSuccess} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <ScanLine className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-xs font-medium text-white/70">
                  Auto-Detect
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Settings className="h-5 w-5 text-purple-400" />
                </div>
                <span className="text-xs font-medium text-white/70">
                  Settings
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full animate-ping absolute inset-0"></div>
                  <div className="w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin relative z-10"></div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-lg font-medium text-white">
                    Identifying Product
                  </p>
                  <p className="text-sm text-white/40">Searching database...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <ProductForm
                    barcode={scannedCode!}
                    product={product}
                    onSuccess={resetScanner}
                  />
                </div>
                <Button
                  variant="ghost"
                  className="w-full py-6 rounded-2xl border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-all"
                  onClick={resetScanner}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Scan Another Product
                </Button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
