import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cheap Games",
  description: "Website to find where to get games the cheapest",
    icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
