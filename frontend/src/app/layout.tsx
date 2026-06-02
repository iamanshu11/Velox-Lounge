import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "VeloxLounge — Premium Airport Lounge Access", template: "%s | VeloxLounge" },
  description: "Access 1,300+ premium airport lounges in 148 countries with a single membership. Enjoy exclusive dining, spa, Wi-Fi, and more with VeloxLounge powered by DragonPass.",
  keywords: [
    "airport lounge access", "DragonPass", "VeloxLounge", "premium travel",
    "lounge membership", "airport lounge", "travel benefits", "priority pass",
  ],
  openGraph: {
    title: "VeloxLounge — Premium Airport Lounge Access",
    description: "Access 1,300+ premium airport lounges in 148 countries.",
    type: "website",
    url: "https://veloxlounge.com",
  },
  twitter: { card: "summary_large_image", title: "VeloxLounge" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}