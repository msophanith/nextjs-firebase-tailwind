"use client";

import { useState, useEffect } from "react";
import { useFirestore } from "reactfire";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  Trash2,
  Edit2,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Contribution } from "./types";

interface ContributionListProps {
  contributions: Contribution[];
  status: "loading" | "error" | "success";
}

export function ContributionList({
  contributions,
  status,
}: ContributionListProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editGender, setEditGender] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteDoc(doc(firestore, "contributions", id));
        toast({
          title: "Deleted",
          description: "Contribution removed successfully.",
        });
      } catch (error) {
        console.error("Error deleting contribution:", error);
        toast({
          title: "Error",
          description: "Failed to delete contribution.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = async () => {
    if (
      !editingId ||
      !editName.trim() ||
      !editAmount ||
      parseFloat(editAmount) <= 0
    ) {
      return;
    }

    try {
      await updateDoc(doc(firestore, "contributions", editingId), {
        name: editName.trim(),
        amount: parseFloat(editAmount),
        address: editAddress.trim(),
        gender: editGender,
      });
      setEditingId(null);
      toast({
        title: "Updated",
        description: "Contribution updated successfully.",
      });
    } catch (error) {
      console.error("Error updating contribution:", error);
      toast({
        title: "Error",
        description: "Failed to update contribution.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    if (!contributions || contributions.length === 0) return;

    const headers = ["Name", "Gender", "Address", "Amount", "Date"];
    const rows = contributions.map((c) => [
      c.name,
      c.gender || "",
      c.address || "",
      c.amount.toString(),
      c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString("en-US") : "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `contributions_${new Date().toISOString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const totalItems = contributions?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContributions = contributions?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (!isMounted) {
    return (
      <Card className="lg:col-span-3 bg-white/5 border-white/10 backdrop-blur-xl text-white overflow-hidden flex flex-col min-h-[400px]">
        <CardHeader>
          <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
        </CardHeader>
        <CardContent className="p-8 flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-3 bg-white/5 border-white/10 backdrop-blur-xl text-white overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription className="text-slate-400">
            A list of all contributions received.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={exportToCSV}
          className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2"
        >
          <Download size={16} /> Export CSV
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-300">Name</TableHead>
                <TableHead className="text-slate-300">Gender</TableHead>
                <TableHead className="text-slate-300">Address</TableHead>
                <TableHead className="text-slate-300">Amount</TableHead>
                <TableHead className="text-slate-300">Date & Time</TableHead>
                <TableHead className="text-right text-slate-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {status === "loading" ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      Loading entries...
                    </div>
                  </TableCell>
                </TableRow>
              ) : status === "error" ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-red-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-bold">Permission Denied</span>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        Firestore rules might not be deployed yet. Please ensure
                        you have run{" "}
                        <code className="bg-white/10 px-1 rounded">
                          firebase deploy --only firestore:rules
                        </code>
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : contributions?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-slate-500"
                  >
                    No entries found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedContributions?.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell className="text-slate-400">
                      {entry.gender || "-"}
                    </TableCell>
                    <TableCell className="text-slate-400 max-w-[150px] truncate">
                      {entry.address || "-"}
                    </TableCell>
                    <TableCell className="text-blue-400 font-semibold">
                      $
                      {entry.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {entry.createdAt?.toDate
                        ? entry.createdAt.toDate().toLocaleString("en-US")
                        : "Pending..."}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={editingId === entry.id}
                          onOpenChange={(open) => {
                            if (!open) setEditingId(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
                              onClick={() => {
                                setEditingId(entry.id);
                                setEditName(entry.name);
                                setEditAmount(entry.amount.toString());
                                setEditAddress(entry.address || "");
                                setEditGender(entry.gender || "Male");
                              }}
                            >
                              <Edit2 size={14} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-900 border-white/10 text-white">
                            <DialogHeader>
                              <DialogTitle>Edit Entry</DialogTitle>
                              <DialogDescription className="text-slate-400">
                                Update the contribution details.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                  Name
                                </label>
                                <Input
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="bg-white/5 border-white/10 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                  Gender
                                </label>
                                <select
                                  value={editGender}
                                  onChange={(e) =>
                                    setEditGender(e.target.value)
                                  }
                                  className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white outline-none"
                                >
                                  <option value="Male" className="bg-slate-900">
                                    Male
                                  </option>
                                  <option
                                    value="Female"
                                    className="bg-slate-900"
                                  >
                                    Female
                                  </option>
                                  <option
                                    value="Other"
                                    className="bg-slate-900"
                                  >
                                    Other
                                  </option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                  Address
                                </label>
                                <Input
                                  value={editAddress}
                                  onChange={(e) =>
                                    setEditAddress(e.target.value)
                                  }
                                  className="bg-white/5 border-white/10 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                  Amount
                                </label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={editAmount}
                                  onChange={(e) =>
                                    setEditAmount(e.target.value)
                                  }
                                  className="bg-white/5 border-white/10 text-white"
                                />
                              </div>
                            </div>
                            <DialogFooter className="gap-2">
                              <Button
                                variant="ghost"
                                onClick={() => setEditingId(null)}
                                className="text-slate-400 hover:text-white hover:bg-white/5"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleEdit}
                                className="bg-blue-600 hover:bg-blue-500 text-white"
                              >
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {totalPages > 1 && (
        <CardFooter className="border-t border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between bg-white/[0.02] gap-4">
          <div className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-medium text-white">{startIndex + 1}</span> to{" "}
            <span className="font-medium text-white">
              {Math.min(startIndex + itemsPerPage, totalItems)}
            </span>{" "}
            of <span className="font-medium text-white">{totalItems}</span>{" "}
            entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10 text-white disabled:opacity-30"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className={`h-8 w-8 ${
                      currentPage === pageNum
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                    }`}
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10 text-white disabled:opacity-30"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
