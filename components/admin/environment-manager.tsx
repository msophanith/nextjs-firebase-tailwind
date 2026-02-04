"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Edit2,
  Eye,
  EyeOff,
  Save,
  Rocket,
  Server,
  Code,
  Globe,
  CheckCircle2,
  AlertCircle,
  Clock,
  MoreVertical,
  ChevronRight,
  Terminal,
  Cpu,
  History,
  ExternalLink,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EnvStatus = "Active" | "Inactive" | "Error";

interface EnvVar {
  id: string;
  key: string;
  value: string;
  isSecret: boolean;
}

interface Environment {
  id: string;
  name: string;
  type: "Production" | "Staging" | "Development" | "Custom";
  status: EnvStatus;
  variables: EnvVar[];
  settings: {
    buildCommand: string;
    outputDirectory: string;
    runtimeVersion: string;
    autoDeploy: boolean;
  };
}

const initialEnvironments: Environment[] = [
  {
    id: "1",
    name: "Production",
    type: "Production",
    status: "Active",
    variables: [
      {
        id: "v1",
        key: "DATABASE_URL",
        value: "postgresql://prod-db:5432/main",
        isSecret: true,
      },
      { id: "v2", key: "API_KEY", value: "sk_prod_123456789", isSecret: true },
      {
        id: "v3",
        key: "NEXT_PUBLIC_SITE_URL",
        value: "https://venefish.com",
        isSecret: false,
      },
    ],
    settings: {
      buildCommand: "next build",
      outputDirectory: ".next",
      runtimeVersion: "Node.js 20.x",
      autoDeploy: true,
    },
  },
  {
    id: "2",
    name: "Staging",
    type: "Staging",
    status: "Active",
    variables: [
      {
        id: "v4",
        key: "DATABASE_URL",
        value: "postgresql://staging-db:5432/main",
        isSecret: true,
      },
      { id: "v5", key: "API_KEY", value: "sk_test_987654321", isSecret: true },
    ],
    settings: {
      buildCommand: "next build",
      outputDirectory: ".next",
      runtimeVersion: "Node.js 18.x",
      autoDeploy: true,
    },
  },
  {
    id: "3",
    name: "Development",
    type: "Development",
    status: "Inactive",
    variables: [
      {
        id: "v6",
        key: "DATABASE_URL",
        value: "postgresql://localhost:5432/dev",
        isSecret: false,
      },
    ],
    settings: {
      buildCommand: "npm run dev",
      outputDirectory: ".next",
      runtimeVersion: "Node.js 18.x",
      autoDeploy: false,
    },
  },
];

export function EnvironmentManager() {
  const [environments, setEnvironments] =
    useState<Environment[]>(initialEnvironments);
  const [activeTab, setActiveTab] = useState<string>(initialEnvironments[0].id);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const activeEnv =
    environments.find((e) => e.id === activeTab) || environments[0];

  const toggleSecret = (varId: string) => {
    setShowSecrets((prev) => ({ ...prev, [varId]: !prev[varId] }));
  };

  const updateVariable = (
    envId: string,
    varId: string,
    field: keyof EnvVar,
    value: any
  ) => {
    setEnvironments((prev) =>
      prev.map((env) => {
        if (env.id !== envId) return env;
        return {
          ...env,
          variables: env.variables.map((v) =>
            v.id === varId ? { ...v, [field]: value } : v
          ),
        };
      })
    );
  };

  const addVariable = (envId: string) => {
    const newVar: EnvVar = {
      id: Math.random().toString(36).substr(2, 9),
      key: "",
      value: "",
      isSecret: false,
    };
    setEnvironments((prev) =>
      prev.map((env) => {
        if (env.id !== envId) return env;
        return { ...env, variables: [...env.variables, newVar] };
      })
    );
  };

  const removeVariable = (envId: string, varId: string) => {
    setEnvironments((prev) =>
      prev.map((env) => {
        if (env.id !== envId) return env;
        return {
          ...env,
          variables: env.variables.filter((v) => v.id !== varId),
        };
      })
    );
  };

  const updateSettings = (
    envId: string,
    field: keyof Environment["settings"],
    value: any
  ) => {
    setEnvironments((prev) =>
      prev.map((env) => {
        if (env.id !== envId) return env;
        return {
          ...env,
          settings: { ...env.settings, [field]: value },
        };
      })
    );
  };

  const getStatusBadge = (status: EnvStatus) => {
    switch (status) {
      case "Active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-600 border-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          >
            Active
          </Badge>
        );
      case "Inactive":
        return (
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-500 border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          >
            Inactive
          </Badge>
        );
      case "Error":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-600 border-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          >
            Error
          </Badge>
        );
    }
  };

  const getEnvIcon = (type: Environment["type"]) => {
    switch (type) {
      case "Production":
        return <Rocket className="w-4 h-4 text-primary" />;
      case "Staging":
        return <Server className="w-4 h-4 text-blue-500" />;
      case "Development":
        return <Code className="w-4 h-4 text-orange-500" />;
      default:
        return <Globe className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Sidebar: Environment List */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Environments
          </h3>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100 text-primary"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {environments.map((env) => (
            <button
              key={env.id}
              onClick={() => setActiveTab(env.id)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border transition-all duration-300 group relative overflow-hidden",
                activeTab === env.id
                  ? "bg-white border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                  : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100"
              )}
            >
              {activeTab === env.id && (
                <motion.div
                  layoutId="active-env-glow"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary pointer-events-none"
                />
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border transition-colors",
                        activeTab === env.id
                          ? "bg-primary/5 border-primary/10"
                          : "bg-slate-50 border-slate-100"
                      )}
                    >
                      {getEnvIcon(env.type)}
                    </div>
                    <div>
                      <span
                        className={cn(
                          "font-bold text-sm block transition-colors",
                          activeTab === env.id
                            ? "text-slate-900"
                            : "text-slate-500 group-hover:text-slate-700"
                        )}
                      >
                        {env.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                        {env.type}
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(env.status)}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex -space-x-2">
                    {env.variables.slice(0, 3).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden"
                      >
                        <div className="w-full h-full bg-slate-200" />
                      </div>
                    ))}
                    {env.variables.length > 3 && (
                      <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[8px] font-bold text-slate-400">
                        +{env.variables.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    Last deploy 2h ago
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content: Details */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-4xl font-black tracking-tight text-slate-900">
                    {activeEnv.name}
                  </h2>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
                </div>
                <p className="text-slate-500 text-sm font-medium max-w-md">
                  Configure environment variables and deployment settings for
                  your {activeEnv.type.toLowerCase()} environment.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="bg-white border-slate-200 hover:bg-slate-50 rounded-xl h-11 px-5 gap-2 font-bold text-slate-700"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Visit Site</span>
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-11 px-6 shadow-lg shadow-primary/10 font-bold">
                  Deploy Now
                </Button>
              </div>
            </div>

            <Tabs defaultValue="variables" className="w-full">
              <TabsList className="bg-slate-100/50 border border-slate-200 p-1 rounded-2xl mb-8 w-fit">
                <TabsTrigger
                  value="variables"
                  className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-bold text-xs uppercase tracking-widest"
                >
                  Variables
                </TabsTrigger>
                <TabsTrigger
                  value="deployment"
                  className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-bold text-xs uppercase tracking-widest"
                >
                  Deployment
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 font-bold text-xs uppercase tracking-widest"
                >
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="variables" className="space-y-6 outline-none">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Environment Variables
                      </h4>
                    </div>
                    <Button
                      onClick={() => addVariable(activeEnv.id)}
                      variant="outline"
                      className="bg-slate-50 border-slate-200 hover:bg-slate-100 rounded-xl h-9 text-xs font-bold gap-2 text-slate-700"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add New
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {activeEnv.variables.map((v) => (
                      <motion.div
                        layout
                        key={v.id}
                        className="flex items-center gap-4 group p-2 rounded-2xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex-1 grid grid-cols-12 gap-4">
                          <div className="col-span-4">
                            <Input
                              placeholder="VARIABLE_NAME"
                              value={v.key}
                              onChange={(e) =>
                                updateVariable(
                                  activeEnv.id,
                                  v.id,
                                  "key",
                                  e.target.value
                                )
                              }
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/50 font-mono text-xs h-11 rounded-xl placeholder:text-slate-300"
                            />
                          </div>
                          <div className="col-span-8 relative">
                            <Input
                              type={
                                v.isSecret && !showSecrets[v.id]
                                  ? "password"
                                  : "text"
                              }
                              placeholder="variable_value"
                              value={v.value}
                              onChange={(e) =>
                                updateVariable(
                                  activeEnv.id,
                                  v.id,
                                  "value",
                                  e.target.value
                                )
                              }
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/50 font-mono text-xs h-11 rounded-xl pr-12 placeholder:text-slate-300"
                            />
                            {v.isSecret && (
                              <button
                                onClick={() => toggleSecret(v.id)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                {showSecrets[v.id] ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-3 px-3 h-11 bg-slate-50 rounded-xl border border-slate-200">
                            <Switch
                              checked={v.isSecret}
                              onCheckedChange={(checked) =>
                                updateVariable(
                                  activeEnv.id,
                                  v.id,
                                  "isSecret",
                                  checked
                                )
                              }
                              className="scale-75 data-[state=checked]:bg-primary"
                            />
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                              Secret
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVariable(activeEnv.id, v.id)}
                            className="h-11 w-11 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-4">
                    <Button
                      variant="ghost"
                      className="text-slate-400 font-bold hover:bg-slate-50 rounded-xl px-6"
                    >
                      Discard
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl px-8 h-11 shadow-lg shadow-slate-200">
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="deployment"
                className="space-y-6 outline-none"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                      <Terminal className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">
                        Build Settings
                      </Label>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            Build Command
                          </span>
                          <Input
                            value={activeEnv.settings.buildCommand}
                            onChange={(e) =>
                              updateSettings(
                                activeEnv.id,
                                "buildCommand",
                                e.target.value
                              )
                            }
                            className="bg-slate-50 border-slate-200 font-mono text-xs h-10 rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            Output Directory
                          </span>
                          <Input
                            value={activeEnv.settings.outputDirectory}
                            onChange={(e) =>
                              updateSettings(
                                activeEnv.id,
                                "outputDirectory",
                                e.target.value
                              )
                            }
                            className="bg-slate-50 border-slate-200 font-mono text-xs h-10 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                      <Cpu className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">
                        Runtime Configuration
                      </Label>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            Node.js Version
                          </span>
                          <Select
                            value={activeEnv.settings.runtimeVersion}
                            onValueChange={(val) =>
                              updateSettings(
                                activeEnv.id,
                                "runtimeVersion",
                                val
                              )
                            }
                          >
                            <SelectTrigger className="bg-slate-50 border-slate-200 h-10 rounded-xl text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-slate-200 text-slate-900 rounded-xl">
                              <SelectItem value="Node.js 18.x">
                                Node.js 18.x (LTS)
                              </SelectItem>
                              <SelectItem value="Node.js 20.x">
                                Node.js 20.x (Current)
                              </SelectItem>
                              <SelectItem value="Node.js 22.x">
                                Node.js 22.x (Beta)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl mt-2">
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              Auto-deploy
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                              Deploy on git push
                            </p>
                          </div>
                          <Switch
                            checked={activeEnv.settings.autoDeploy}
                            onCheckedChange={(checked) =>
                              updateSettings(
                                activeEnv.id,
                                "autoDeploy",
                                checked
                              )
                            }
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 outline-none">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <History className="w-4 h-4 text-blue-500" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Deployment History
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        commit: "feat: add analytics provider",
                        sha: "a1b2c3d",
                        time: "2 hours ago",
                        status: "Success",
                      },
                      {
                        commit: "fix: environment variable leak",
                        sha: "e5f6g7h",
                        time: "5 hours ago",
                        status: "Success",
                      },
                      {
                        commit: "refactor: optimize build pipeline",
                        sha: "i9j0k1l",
                        time: "1 day ago",
                        status: "Error",
                      },
                    ].map((deploy, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-200 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-2.5 h-2.5 rounded-full",
                              deploy.status === "Success"
                                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.2)]"
                                : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                            )}
                          />
                          <div>
                            <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                              {deploy.commit}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-mono text-slate-400 bg-white border border-slate-100 px-1.5 py-0.5 rounded uppercase">
                                {deploy.sha}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                • {deploy.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-slate-900 rounded-lg h-8 px-3 text-[10px] font-bold uppercase tracking-widest"
                        >
                          Logs
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
