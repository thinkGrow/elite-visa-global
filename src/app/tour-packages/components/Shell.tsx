import React from "react";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main style={themeVars} className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="pt-24 pb-14 sm:pt-28 sm:pb-16">{children}</div>
    </main>
  );
}

export function Divider() {
  return <div className="my-10 h-px w-full bg-slate-200/70" />;
}