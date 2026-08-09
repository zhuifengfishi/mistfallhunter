import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mistfall Hunter Community Wiki",
  description: "Practical Mistfall Hunter guides for every hunt.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
