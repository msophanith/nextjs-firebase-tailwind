"use client";

import { Suspense } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy } from "firebase/firestore";
import { ContributionHeader } from "@/components/contributions/contribution-header";
import { ContributionForm } from "@/components/contributions/contribution-form";
import { ContributionList } from "@/components/contributions/contribution-list";
import { Contribution } from "@/components/contributions/types";

export default function ContributionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ContributionsContent />
    </Suspense>
  );
}

function ContributionsContent() {
  const firestore = useFirestore();
  const contributionsCollection = collection(firestore, "contributions");
  const contributionsQuery = query(
    contributionsCollection,
    orderBy("createdAt", "desc")
  );

  const { data: contributions, status } = useFirestoreCollectionData(
    contributionsQuery,
    {
      idField: "id",
    }
  ) as unknown as {
    data: Contribution[];
    status: "loading" | "error" | "success";
  };

  const totalAmount =
    contributions?.reduce((sum, item) => sum + item.amount, 0) || 0;

  const audienceCount = contributions?.length || 0;
  const maleCount =
    contributions?.filter((c) => c.gender === "Male").length || 0;
  const femaleCount =
    contributions?.filter((c) => c.gender === "Female").length || 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <ContributionHeader
          totalAmount={totalAmount}
          audienceCount={audienceCount}
          maleCount={maleCount}
          femaleCount={femaleCount}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ContributionForm />
          <ContributionList contributions={contributions} status={status} />
        </div>
      </div>
    </div>
  );
}
