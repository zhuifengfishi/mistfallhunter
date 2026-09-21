import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
  },
});

const AGENT_LINK = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/json"',
  '</llms.txt>; rel="service-doc"; type="text/plain"',
  '</.well-known/ai-catalog.json>; rel="describedby"; type="application/json"',
].join(", ");

const nextConfig: NextConfig = {
  // App-level HTTPS enforcement also lives in worker/index.ts (x-forwarded-proto).
  // Cloudflare: enable Always Use HTTPS + www CNAME → Pages (see PR notes).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Link",
            value: AGENT_LINK,
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
