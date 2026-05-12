"use client";

import Link from "next/link";
import { Menu, X, MapPin, Home, Search, LayoutDashboard, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/ui/theme/ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home, match: "exact" },
  { href: "/browse", label: "Look for houses", icon: Search, match: "prefix" },
  { href: "/landlord/signin", label: "List a house", icon: LayoutDashboard, match: "prefix" },
];

function isActive(pathname, item) {
  if (!pathname) return false;
  if (item.match === "exact") return pathname === item.href;
  return pathname.startsWith(item.href);
}

/**
 * AppHeader component that replicates the Landlord portal's sidebar behavior for mobile
 * while maintaining a clean top-bar for desktop.
 */
export function AppHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isLandlordPath = pathname?.startsWith("/landlord");
  if (isLandlordPath) return null;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 transition-transform group-hover:scale-110">
              <img 
                src="/favicon.ico.png" 
                alt="Tafutanga Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
              Tafutanga
            </div>
          </Link>

          {/* Desktop Nav (Standard) */}
          <nav className="hidden items-center gap-3 md:flex">
            <Link
              href="/"
              className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                pathname === "/browse" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              Look for houses
            </Link>
            <Link
              href="/landlord/signin"
              className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-bold text-background shadow-sm hover:opacity-80 transition-all"
            >
              List a house
            </Link>
            <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted md:hidden"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Sidebar (Identical to Landlord Portal behavior) */}
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-72 max-w-[85vw] border-r border-border bg-background p-4 shadow-2xl transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-semibold">Tafutanga Menu</div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <SidebarContent pathname={pathname} onNavigate={() => setIsOpen(false)} />
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-black/40 backdrop-blur-[1px]"
          />
        </div>
      ) : null}
    </>
  );
}

function SidebarContent({ pathname, onNavigate }) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item);
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`inline-flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-background text-foreground hover:bg-muted"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}

      <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6">
        <div className="px-2 mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Settings</div>
        <ThemeToggle className="w-full justify-start rounded-2xl border-none bg-transparent hover:bg-muted" />
      </div>
    </div>
  );
}