import React from "react";
import { EnvironmentManager } from "@/components/admin/environment-manager";

export default function EnvironmentsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Environments</h2>
        <p className="text-muted-foreground">
          Manage your application environments, variables, and deployment
          settings.
        </p>
      </div>

      <EnvironmentManager />
    </div>
  );
}
