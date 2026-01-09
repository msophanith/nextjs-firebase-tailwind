"use client";

import { useState } from "react";
import { useFirestore } from "reactfire";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  User,
  Users,
  MapPin,
  DollarSign,
  Settings2,
  Database,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export function ContributionForm() {
  const firestore = useFirestore();
  const contributionsCollection = collection(firestore, "contributions");
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Storage options
  const [storageMode, setStorageMode] = useState<"firebase" | "googlesheets">(
    "firebase"
  );
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid name and a positive amount.",
        variant: "destructive",
      });
      return;
    }

    if (storageMode === "googlesheets" && !googleSheetsUrl.trim()) {
      toast({
        title: "Missing URL",
        description:
          "Please provide your Google Sheets Web App URL in settings.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (storageMode === "firebase") {
        await addDoc(contributionsCollection, {
          name: name.trim(),
          amount: parseFloat(amount),
          address: address.trim(),
          gender: gender,
          createdAt: serverTimestamp(),
        });
      } else {
        // Send to Google Sheets
        const response = await fetch(googleSheetsUrl, {
          method: "POST",
          mode: "no-cors", // Required for Google Apps Script Web Apps
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            amount: parseFloat(amount),
            address: address.trim(),
            gender: gender,
            timestamp: new Date().toISOString(),
          }),
        });

        // Note: With no-cors, we can't read the response body,
        // but if it doesn't throw, it's usually successful.
      }

      setName("");
      setAmount("");
      setAddress("");
      setGender("Male");
      toast({
        title: "Success",
        description: `Contribution saved to ${
          storageMode === "firebase" ? "Firebase" : "Google Sheets"
        } successfully.`,
      });
    } catch (error) {
      console.error("Error saving contribution:", error);
      toast({
        title: "Error",
        description: "Failed to save contribution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Add New Entry</CardTitle>
          <CardDescription className="text-slate-400">
            Enter contribution details.
          </CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-white/10"
            >
              <Settings2 size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Storage Settings</DialogTitle>
              <DialogDescription className="text-slate-400">
                Choose where you want to save your data.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">
                  Storage Destination
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStorageMode("firebase")}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                      storageMode === "firebase"
                        ? "bg-blue-600/20 border-blue-500 text-blue-400"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    <Database size={18} />
                    <span>Firebase</span>
                  </button>
                  <button
                    onClick={() => setStorageMode("googlesheets")}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                      storageMode === "googlesheets"
                        ? "bg-green-600/20 border-green-500 text-green-400"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    <FileSpreadsheet size={18} />
                    <span>Google Sheets</span>
                  </button>
                </div>
              </div>

              {storageMode === "googlesheets" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-sm font-medium text-slate-300">
                    Google Sheets Web App URL
                  </label>
                  <Input
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={googleSheetsUrl}
                    onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Deploy your Google Apps Script as a Web App with "Anyone"
                    access to use this feature.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  toast({
                    title: "Settings Saved",
                    description: `Storage mode set to ${
                      storageMode === "firebase" ? "Firebase" : "Google Sheets"
                    }.`,
                  });
                }}
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-2">
            {storageMode === "firebase" ? (
              <>
                <Database size={12} className="text-blue-400" />
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  Saving to Firebase
                </span>
              </>
            ) : (
              <>
                <FileSpreadsheet size={12} className="text-green-400" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">
                  Saving to Google Sheets
                </span>
              </>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <User size={14} /> Audience Name
            </label>
            <Input
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Users size={14} /> Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 focus:border-blue-500/50 text-white outline-none"
            >
              <option value="Male" className="bg-slate-900">
                Male
              </option>
              <option value="Female" className="bg-slate-900">
                Female
              </option>
              <option value="Other" className="bg-slate-900">
                Other
              </option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <MapPin size={14} /> Address
            </label>
            <Input
              placeholder="e.g. Phnom Penh"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <DollarSign size={14} /> Amount
            </label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-bold py-6 rounded-xl transition-all ${
              storageMode === "firebase"
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-green-600 hover:bg-green-500"
            } text-white`}
          >
            {isSubmitting ? "Saving..." : "Submit Entry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
