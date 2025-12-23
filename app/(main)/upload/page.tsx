"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
const ManualLocationPicker = dynamic(
  () => import("@/components/leaflet/manual-location-picker"),
  { ssr: false }
);
import { readImageLocation } from "@/lib/utils";
import { isInsideCambodia } from "@/lib/cambodia";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UploadPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (f: File) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setStatus("Reading EXIF...");
    const gps = await readImageLocation(f);

    if (gps && isInsideCambodia(gps.lat, gps.lng)) {
      setLocation(gps);
      setStatus("GPS found in image ✅");
      setShowMap(false);

      // Show toast when location is automatically detected
      toast({
        title: "Location Found!",
        description: "GPS location detected from image.",
        variant: "default",
      });
    } else {
      setShowMap(true);
      if (gps && !isInsideCambodia(gps.lat, gps.lng)) {
        setStatus("Image location is outside Cambodia — pick manually.");
        toast({
          title: "Location Ignored",
          description:
            "The image location is outside Cambodia. Please pin it manually.",
          variant: "destructive",
        });
      } else {
        setStatus("No GPS found — pick location manually.");
      }
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
    setStatus("Location selected manually ✅");

    // Show toast when location is manually pinned
    toast({
      title: "Location Pinned!",
      description: "Location pinned successfully.",
      variant: "default",
    });
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setLocation(null);
    setShowMap(false);
    setStatus("");
  };

  const handleUpload = async () => {
    if (!file || !location) return;

    setIsUploading(true);
    setStatus("Converting image...");
    try {
      // Convert image to base64
      const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };

      const base64Image = await convertToBase64(file);

      setStatus("Uploading to Firestore...");

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await addDoc(collection(firestore, "posts"), {
        imageData: base64Image,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        location,
        createdAt: serverTimestamp(),
        expiresAt: expiresAt,
      });

      setStatus("Upload complete 🎉");

      // Show success toast after upload completes
      toast({
        title: "Upload Successful!",
        description: "Your image has been uploaded and pinned to the map.",
        variant: "default",
      });

      // Reset form state
      setFile(null);
      setPreviewUrl(null);
      setLocation(null);
      setShowMap(false);

      // Redirect to map view after successful upload
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("Upload failed. Please try again.");

      // Show error toast
      toast({
        title: "Upload Failed",
        description:
          "There was an error uploading your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-muted/30 gap-6">
      <div className="w-full max-w-2xl flex justify-start">
        <Link href="/">
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Map
          </Button>
        </Link>
      </div>
      <Card className="w-full max-w-2xl shadow-xl border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Upload Image
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    className="text-muted-foreground cursor-help"
                    size={20}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Privacy: We do not collect or store personal user data.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Share your moments by pinning them to the map.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!file ? (
            <div
              className={cn(
                "relative group cursor-pointer border-2 border-dashed border-muted-foreground/25 rounded-2xl p-12 transition-all hover:border-primary/50 hover:bg-primary/5",
                "flex flex-col items-center justify-center gap-4 text-center"
              )}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <UploadCloud size={40} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium">Click or drag to upload</p>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG or WEBP (max. 10MB)
                </p>
              </div>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleFileChange(e.target.files[0])
                }
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-inner bg-muted">
                <img
                  src={previewUrl!}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full shadow-lg"
                  onClick={removeFile}
                  disabled={isUploading}
                >
                  <X size={18} />
                </Button>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                {status.includes("✅") || status.includes("🎉") ? (
                  <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                ) : status.includes("failed") ? (
                  <AlertCircle
                    className="text-destructive shrink-0"
                    size={20}
                  />
                ) : (
                  <Loader2
                    className="text-primary animate-spin shrink-0"
                    size={20}
                  />
                )}
                <p className="text-sm font-medium">{status}</p>
              </div>
            </div>
          )}

          {showMap && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Pick Location Manually
              </Label>
              <div className="rounded-xl overflow-hidden border border-border shadow-md">
                <ManualLocationPicker onSelect={handleLocationSelect} />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20"
            disabled={!file || !location || isUploading}
            onClick={handleUpload}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload to Map"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadPage;
