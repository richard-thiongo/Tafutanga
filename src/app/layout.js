import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/ui/AppHeader";
import { ToastViewport } from "@/ui/ToastViewport";

// geist font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// geistMono font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// cormorant font
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// metadata
export const metadata = {
  title: {
    default: "Tafutanga",
    template: "%s | Tafutanga",
  },
  applicationName: "Tafutanga",
  description:
    "Tafutanga helps Kenyans in Nairobi find and compare houses and rentals faster.",
  keywords: [
    "Tafutanga",
    "Nairobi",
    "Kenya",
    "house hunting",
    "rentals",
    "apartments",
    "real estate",
  ],
  metadataBase: new URL("https://tafutanga.vercel.app"),
  icons: {
    icon: "/main-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head />
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <ToastViewport />
      </body>
    </html>
  );
}
