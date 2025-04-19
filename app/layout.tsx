import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "Slides-AI",
  description: "Generate stunnig Presentations with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Analytics />
        </Providers>
        <Toaster richColors duration={1500} position="top-right" />
      </body>
    </html>
  );
}
