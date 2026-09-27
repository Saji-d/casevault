"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, Heart } from "lucide-react";

const platformLinks = [
  { label: "Interactive AI Legal Assistant", href: "/chat" },
  { label: "Citations Splitscreen Editor", href: "/workspace" },
  { label: "Personal Legal Briefcase", href: "/library" },
  { label: "Database Synchronization", href: "/admin" },
];

const legalCategories = [
  { label: "Constitution (1972)" },
  { label: "General Acts & Codes" },
  { label: "Labour & Employment Law" },
  { label: "Supreme Court Judgements" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full border-t border-border bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Scale size={15} />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                CaseVault
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              AI-powered legal intelligence platform indexing constitutional
              articles, acts, and supreme court judgements for Bangladesh.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Platform
            </h5>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Categories */}
          <div>
            <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Legal Categories
            </h5>
            <ul className="space-y-2.5">
              {legalCategories.map((cat) => (
                <li key={cat.label}>
                  <span className="text-xs text-muted-foreground/70 hover:text-foreground cursor-pointer transition-colors">
                    {cat.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Disclaimer */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Legal Disclaimer
            </h5>
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              CaseVault is a legal research and search tool. The information
              provided does not constitute formal legal advice. Use of these
              resources is at the user&apos;s discretion.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground/60">
          <span>
            &copy; {new Date().getFullYear()} CaseVault. All rights reserved.
          </span>
          <span className="flex items-center gap-1 mt-2 sm:mt-0">
            Made for Bangladesh Legal Corpus with
            <Heart size={10} className="text-red-500/70" />
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
