"use client";

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  ExternalLink,
  Globe,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ResumePage() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Dynamic Background Effects - Absolute for print to avoid repetition issues */}
      <div className="fixed inset-0 z-0 pointer-events-none print:absolute print:inset-0 print:h-full">
        <div
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse"
          style={{ animationDuration: "12s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:max-w-none">
        {/* Floating Action Bar */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            <span className="text-slate-400 font-medium tracking-wide text-sm uppercase">
              Resume / CV
            </span>
          </div>
          <Button
            onClick={handleDownload}
            className="bg-white text-slate-950 hover:bg-blue-50 border-0 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Main Resume Container - Glassmorphism */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden print:rounded-none print:shadow-none print:border-0 print:bg-slate-900/80">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[800px]">
            {/* LEFT SIDEBAR (Dark/Brand Color) */}
            <div className="md:col-span-4 lg:col-span-3 bg-slate-950/50 border-r border-white/5 p-8 flex flex-col gap-8 print:col-span-4 print:bg-slate-950/60">
              {/* Profile Header (Mobile/Sidebar) */}
              <div className="text-center md:text-left">
                <div className="relative inline-block mb-6 group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-slate-950 bg-slate-800">
                    <img
                      src="/profile.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                  Your Name
                </h1>
                <p className="text-blue-400 font-medium text-lg mb-6">
                  Full Stack Developer
                </p>

                {/* Contact Info */}
                <div className="space-y-4 text-sm">
                  <a
                    href="mailto:hello@example.com"
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-500/20 transition-colors">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="truncate">hello@example.com</span>
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-500/20 transition-colors">
                      <Phone className="w-4 h-4 text-blue-400" />
                    </div>
                    <span>+1 (234) 567-890</span>
                  </a>
                  <div className="flex items-center gap-3 text-slate-400 group">
                    <div className="p-2 rounded-lg bg-white/5">
                      <MapPin className="w-4 h-4 text-blue-400" />
                    </div>
                    <span>San Francisco, CA</span>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-500/20 transition-colors">
                      <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                    <span>portfolio.com</span>
                  </a>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

              {/* Skills Section */}
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-400" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "Tailwind",
                    "PostgreSQL",
                    "AWS",
                    "Docker",
                    "GraphQL",
                    "Figma",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-white/5 hover:bg-white/10 text-slate-300 border-0"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="relative pl-4 border-l border-white/10">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-slate-950/50" />
                    <h4 className="text-slate-200 font-medium text-sm">
                      BS Computer Science
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">
                      University of Tech
                    </p>
                    <p className="text-slate-600 text-xs">2015 - 2019</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-auto pt-8 flex gap-4 justify-center md:justify-start">
                <a
                  href="#"
                  className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white text-slate-400 transition-all duration-300 print:hidden"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white/5 rounded-full hover:bg-slate-700 hover:text-white text-slate-400 transition-all duration-300 print:hidden"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="md:col-span-8 lg:col-span-9 p-8 sm:p-12 bg-white/5">
              {/* Summary */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <User className="w-6 h-6" />
                  </span>
                  About Me
                </h2>
                <p className="text-slate-300 leading-relaxed text-lg font-light">
                  Passionate and results-driven Full Stack Developer with over 5
                  years of experience building scalable web applications. I
                  specialize in creating intuitive user experiences and robust
                  backend architectures. Committed to writing clean,
                  maintainable code and staying current with emerging
                  technologies.
                </p>
              </section>

              {/* Experience */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Briefcase className="w-6 h-6" />
                  </span>
                  Experience
                </h2>

                <div className="space-y-10">
                  {/* Job 1 */}
                  <div className="group relative pl-8 border-l border-white/10 hover:border-purple-500/50 transition-colors">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-purple-500 group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Senior Full Stack Developer
                        </h3>
                        <p className="text-purple-400 font-medium">
                          Tech Giants Inc.
                        </p>
                      </div>
                      <span className="text-sm text-slate-500 bg-white/5 px-3 py-1 rounded-full mt-2 sm:mt-0">
                        2022 - Present
                      </span>
                    </div>

                    <ul className="space-y-3 text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500/50 shrink-0" />
                        <span>
                          Spearheaded the migration of legacy monolith to
                          microservices architecture, improving scalability by
                          200%.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500/50 shrink-0" />
                        <span>
                          Led a team of 5 developers, conducting code reviews
                          and implementing CI/CD pipelines.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500/50 shrink-0" />
                        <span>
                          Reduced page load times by 40% through advanced
                          caching strategies and code splitting.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="group relative pl-8 border-l border-white/10 hover:border-blue-500/50 transition-colors">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Frontend Developer
                        </h3>
                        <p className="text-blue-400 font-medium">
                          Creative Solutions
                        </p>
                      </div>
                      <span className="text-sm text-slate-500 bg-white/5 px-3 py-1 rounded-full mt-2 sm:mt-0">
                        2020 - 2022
                      </span>
                    </div>

                    <ul className="space-y-3 text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0" />
                        <span>
                          Developed responsive, pixel-perfect user interfaces
                          using React and Tailwind CSS.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0" />
                        <span>
                          Collaborated with UX designers to implement complex
                          animations and interactive features.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Featured Projects */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Award className="w-6 h-6" />
                  </span>
                  Featured Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Card 1 */}
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        E-Commerce Dashboard
                      </h3>
                      <a
                        href="#"
                        className="text-slate-500 hover:text-white transition-colors print:hidden"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">
                      A comprehensive analytics dashboard for online retailers
                      featuring real-time data visualization.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-cyan-500/10 text-cyan-400">
                        Next.js
                      </span>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-cyan-500/10 text-cyan-400">
                        D3.js
                      </span>
                    </div>
                  </div>

                  {/* Project Card 2 */}
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                        Social Connect
                      </h3>
                      <a
                        href="#"
                        className="text-slate-500 hover:text-white transition-colors print:hidden"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">
                      Real-time social networking platform with instant
                      messaging and media sharing capabilities.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-pink-500/10 text-pink-400">
                        React
                      </span>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-pink-500/10 text-pink-400">
                        Firebase
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="text-center mt-8 text-slate-500 text-sm print:hidden">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </div>

      {/* Print Specific Styles */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #020617 !important; /* slate-950 */
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            margin: 0;
            size: auto;
            background-color: #020617 !important;
          }
          /* Ensure text contrast in print */
          p,
          h1,
          h2,
          h3,
          h4,
          span,
          div {
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
