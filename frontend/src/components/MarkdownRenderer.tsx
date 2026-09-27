"use client";

import React, { useMemo } from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderedHTML = useMemo(() => {
    if (!content) return "";

    let html = content;

    // Escape HTML to prevent XSS
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Code blocks
    html = html.replace(
      /```(\w*)\n([\s\S]*?)\n```/g,
      (_, lang, code) =>
        `<pre class="bg-secondary/50 border border-border rounded-xl p-5 my-8 overflow-x-auto font-mono text-sm leading-relaxed text-foreground"><code class="language-${lang}">${code.trim()}</code></pre>`
    );

    // Headers
    html = html.replace(
      /^(?:#\s+)(.*?)$/gm,
      '<h1 id="$1" class="font-serif text-3xl font-bold text-foreground mt-10 mb-5 border-b border-border/50 pb-3 scroll-mt-24">$1</h1>'
    );
    html = html.replace(
      /^(?:##\s+)(.*?)$/gm,
      '<h2 id="$1" class="font-serif text-2xl font-bold text-foreground mt-8 mb-4 scroll-mt-24">$1</h2>'
    );
    html = html.replace(
      /^(?:###\s+)(.*?)$/gm,
      '<h3 id="$1" class="font-sans text-xl font-semibold text-foreground mt-6 mb-3 scroll-mt-24">$1</h3>'
    );

    // Bold
    html = html.replace(/\*\*([\s\S]*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
    html = html.replace(/__([\s\S]*?)__/g, '<strong class="font-bold text-foreground">$1</strong>');

    // Italic
    html = html.replace(/\*([\s\S]*?)\*/g, '<em class="italic text-muted-foreground">$1</em>');
    html = html.replace(/_([\s\S]*?)_/g, '<em class="italic text-muted-foreground">$1</em>');

    // Inline code
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-secondary/50 border border-border rounded-md font-mono text-xs text-accent">$1</code>'
    );

    // Blockquotes
    html = html.replace(
      /(?:^|\n)(?:&gt;)\s*(.*?)(?=\n|$)/g,
      '<blockquote class="border-l-2 border-accent/30 pl-5 py-2 my-6 italic text-muted-foreground bg-secondary/20 rounded-r-xl">$1</blockquote>'
    );

    // Unordered lists
    html = html.replace(
      /^(?:\*\s+|- \s*)(.*?)$/gm,
      '<li class="ml-6 list-disc mb-1.5 text-foreground/80 marker:text-accent/60">$1</li>'
    );

    // Ordered lists
    html = html.replace(
      /^(?:\d+\.\s+)(.*?)$/gm,
      '<li class="ml-6 list-decimal mb-1.5 text-foreground/80 marker:text-accent/60">$1</li>'
    );

    // Paragraphs
    const paragraphs = html.split(/\n{2,}/);
    html = paragraphs
      .map((p) => {
        const trimmed = p.trim();
        if (!trimmed) return "";
        if (
          trimmed.startsWith("<h") ||
          trimmed.startsWith("<pre") ||
          trimmed.startsWith("<blockquote") ||
          trimmed.startsWith("<li")
        ) {
          return trimmed;
        }
        return `<p class="leading-relaxed text-foreground/80 mb-5 text-base">${trimmed}</p>`;
      })
      .filter(Boolean)
      .join("\n");

    return html;
  }, [content]);

  return (
    <div
      className="markdown-body transition-colors"
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
    />
  );
}
