import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/ui/navigation/AppHeader";
import { ToastViewport } from "@/ui/toast/ToastViewport";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    icon: "/favicon.ico.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='tafutanga:theme';var t=localStorage.getItem(k);if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <ToastViewport />
      </body>
    </html>
  );
}
