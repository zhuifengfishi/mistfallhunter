"use client";

import { useEffect } from "react";

/**
 * Registers a read-only lookup tool with WebMCP when the browser exposes
 * document.modelContext and/or navigator.modelContext. Never fabricates APIs.
 */
export default function WebMcp() {
  useEffect(() => {
    type ToolFn = (
      args: Record<string, unknown>,
      signal?: AbortSignal,
    ) => Promise<unknown>;
    type ModelContext = {
      registerTool: (
        tool: {
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
          annotations?: Record<string, unknown>;
          execute: ToolFn;
        },
        options?: { signal?: AbortSignal },
      ) => void;
    };

    const docCtx = (document as unknown as { modelContext?: ModelContext })
      .modelContext;
    const navCtx = (navigator as unknown as { modelContext?: ModelContext })
      .modelContext;

    const targets: ModelContext[] = [];
    if (docCtx) targets.push(docCtx);
    if (navCtx && navCtx !== docCtx) targets.push(navCtx);
    if (targets.length === 0) return;

    const ac = new AbortController();

    const tool = {
      name: "lookup_records",
      description:
        "Look up Mistfall Hunter Wiki public guides and classes; returns titles, descriptions, and source URLs.",
      inputSchema: {
        type: "object",
        properties: {
          q: { type: "string", description: "Free-text search query" },
          kind: {
            type: "string",
            enum: ["guide", "class", "all"],
            description: "Record kind filter",
          },
          id: {
            type: "string",
            description: "Exact guide slug or class id",
          },
        },
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
      execute: async (args: Record<string, unknown>, signal?: AbortSignal) => {
        const sp = new URLSearchParams();
        if (typeof args.q === "string" && args.q) sp.set("q", args.q);
        if (typeof args.kind === "string" && args.kind) sp.set("kind", args.kind);
        if (typeof args.id === "string" && args.id) sp.set("id", args.id);
        const res = await fetch(`/api/lookup?${sp.toString()}`, {
          signal: signal || ac.signal,
          headers: { Accept: "application/json" },
        });
        return res.json();
      },
    };

    for (const ctx of targets) {
      try {
        ctx.registerTool(tool, { signal: ac.signal });
      } catch {
        // Keep the page usable if registration is rejected.
      }
    }

    return () => ac.abort();
  }, []);

  return null;
}
