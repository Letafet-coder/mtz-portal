import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Milli Teknoloji Zirvesi",
  description: "Savunma Sanayii ve Teknoloji Delege Portalı",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MTZ Zirve",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-[#0a0f1e] text-white min-h-screen relative`}>
        <div className="fixed inset-0 tech-grid pointer-events-none opacity-20" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
