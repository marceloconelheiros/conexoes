import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import { PwaRegister } from "@/components/PwaRegister";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Conexão Negócios",
  description:
    "Uma rede de mídia digital criada para conectar empresas aos consumidores através de telas instaladas em pontos estratégicos da cidade.",
  applicationName: "Conexão Negócios",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Conexão",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background pb-[calc(6.25rem+env(safe-area-inset-bottom))] text-foreground">
        {children}
        <BottomNav />
        <PwaRegister />
      </body>
    </html>
  );
}
