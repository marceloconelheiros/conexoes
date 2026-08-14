import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import { BrowseTracker } from "@/components/BrowseTracker";
import { PwaRegister } from "@/components/PwaRegister";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Uma rede de mídia digital criada para conectar empresas aos consumidores através de telas instaladas em pontos estratégicos da cidade.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Rede de mídia digital, vitrine local e cashback em Marília.",
  },
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
      <body className="flex min-h-full flex-col bg-background pt-[env(safe-area-inset-top)] pb-[calc(5.2rem+0.85rem+env(safe-area-inset-bottom))] text-foreground">
        <div
          aria-hidden
          className="fixed inset-x-0 top-0 z-50 h-[env(safe-area-inset-top)] bg-[#0b0b0c]"
        />
        {children}
        <BottomNav />
        <BrowseTracker />
        <PwaRegister />
      </body>
    </html>
  );
}
