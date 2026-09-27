"use client";

import Link from "next/link";
import { ShieldCheck, ArrowLeft, Construction } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 px-4">
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
      
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl mb-6">
          <ShieldCheck size={40} className="text-zinc-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Admin Panel</h1>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
          The CaseVault Administration Console will manage document crawling, metadata validation rules, and parser synchronization pipelines.
        </p>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800/80 rounded-full text-xs text-zinc-500 font-medium">
          <Construction size={14} className="text-amber-500/80 animate-pulse" />
          Prepared for Phase 2: Crawler & Ingestion Controls
        </div>
      </div>
    </div>
  );
}
