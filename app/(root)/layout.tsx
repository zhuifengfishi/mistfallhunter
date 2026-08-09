import type { Metadata } from "next";
import { GoogleAnalytics } from "../../components/GoogleAnalytics";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mistfall Hunter Community Wiki",
  description: "Practical Mistfall Hunter guides for every hunt.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RedirectRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
