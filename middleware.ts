import { NextRequest, NextResponse } from "next/server";
import { prefersMarkdown, estimateTokens } from "@/lib/agent/accept";
import { pageMarkdown } from "@/lib/agent/markdown-pages";
import { AGENT_LINK_HEADER } from "@/lib/agent/site";

export function middleware(req: NextRequest) {
  // vinext rejects App Router segments that start with "."; public agents
  // still expect RFC 8615 /.well-known/* paths.
  if (
    req.nextUrl.pathname === "/.well-known" ||
    req.nextUrl.pathname.startsWith("/.well-known/")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.replace("/.well-known", "/well-known");
    return NextResponse.rewrite(url);
  }

  const { pathname } = req.nextUrl;

  const accept = req.headers.get("accept");
  const isPageLike =
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/mcp") &&
    !pathname.startsWith("/.well-known/") &&
    !pathname.startsWith("/well-known/") &&
    !pathname.startsWith("/agent-auth/") &&
    pathname !== "/openapi.json" &&
    pathname !== "/llms.txt" &&
    pathname !== "/llms-full.txt" &&
    pathname !== "/auth.md" &&
    pathname !== "/robots.txt" &&
    pathname !== "/sitemap.xml" &&
    pathname !== "/pages-index.json" &&
    !pathname.startsWith("/ai/");

  if (isPageLike && prefersMarkdown(accept)) {
    const md = pageMarkdown(pathname);
    if (md) {
      return new NextResponse(md, {
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
    return new NextResponse("Not Acceptable: no text/markdown representation\n", {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
        "Cache-Control": "private, no-store",
      },
    });
  }

  const res = NextResponse.next();
  if (isPageLike) {
    res.headers.set("Link", AGENT_LINK_HEADER);
    res.headers.append("Vary", "Accept");
  }
  return res;
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|_vinext/|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp3|wav)$).*)",
  ],
};
