import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://revolutiva.travel"),
  title: {
    default: "REVOLUTIVA.TRAVEL — Viajes que regeneran relaciones",
    template: "%s · REVOLUTIVA.TRAVEL",
  },
  description:
    "Marketplace curado de experiencias, hospedajes y guiados regenerativos. evolucionar viajando.",
  openGraph: {
    siteName: "REVOLUTIVA.TRAVEL",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main id="app">{children}</main>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
