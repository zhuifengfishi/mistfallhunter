/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { prefersMarkdown, estimateTokens } from "../lib/agent/accept";
import { pageMarkdown } from "../lib/agent/markdown-pages";
import { AGENT_LINK_HEADER } from "../lib/agent/site";
import { rewriteWellKnownRequestPath } from "../lib/agent/well-known-path";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function isPageLike(pathname: string): boolean {
  return (
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/mcp") &&
    !pathname.startsWith("/.well-known/") &&
    !pathname.startsWith("/well-known/") &&
    !pathname.startsWith("/agent-auth/") &&
    !pathname.startsWith("/_vinext/") &&
    !pathname.startsWith("/_next/") &&
    pathname !== "/openapi.json" &&
    pathname !== "/llms.txt" &&
    pathname !== "/llms-full.txt" &&
    pathname !== "/auth.md" &&
    pathname !== "/robots.txt" &&
    pathname !== "/sitemap.xml" &&
    pathname !== "/pages-index.json" &&
    !pathname.startsWith("/ai/") &&
    !/\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff2?)$/i.test(pathname)
  );
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    let req = request;
    let url = new URL(req.url);
    const forwardedProto = req.headers.get("x-forwarded-proto");
    const isLocalHost =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname.endsWith(".localhost");
    if (forwardedProto === "http" && !isLocalHost) {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // vinext forbids App Router segments starting with "."; map the public
    // /.well-known/* URLs onto /well-known/* route handlers. Also strip a
    // locale prefix/suffix so PRM discovery for resource …/en still works.
    const wellKnownTarget = rewriteWellKnownRequestPath(url.pathname);
    if (wellKnownTarget) {
      const rewritten = new URL(req.url);
      rewritten.pathname = wellKnownTarget;
      req = new Request(rewritten, req);
      url = rewritten;
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(req, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, req.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const pathname = url.pathname;
    if (isPageLike(pathname) && prefersMarkdown(req.headers.get("accept"))) {
      const md = pageMarkdown(pathname);
      if (md) {
        return new Response(md, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            Vary: "Accept",
            "Cache-Control": "private, no-store",
            "x-markdown-tokens": String(estimateTokens(md)),
            "Access-Control-Allow-Origin": "*",
            Link: AGENT_LINK_HEADER,
          },
        });
      }
      return new Response("Not Acceptable: no text/markdown representation\n", {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
          "Cache-Control": "private, no-store",
        },
      });
    }

    const response = await handler.fetch(req, env, ctx);
    if (!isPageLike(pathname)) return response;

    const headers = new Headers(response.headers);
    if (!headers.has("Link")) headers.set("Link", AGENT_LINK_HEADER);
    const vary = headers.get("Vary");
    if (!vary) headers.set("Vary", "Accept");
    else if (!/\bAccept\b/i.test(vary)) headers.set("Vary", `${vary}, Accept`);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;
