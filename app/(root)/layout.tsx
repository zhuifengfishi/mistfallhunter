import type { Metadata } from "next";
import { AdvertisementScript } from "../../components/Advertisement";
import { GoogleAnalytics } from "../../components/GoogleAnalytics";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mistfall Hunter Wiki",
  description: "Mistfall Hunter Wiki with practical class, hunt, and extraction guides.",
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
        <AdvertisementScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
