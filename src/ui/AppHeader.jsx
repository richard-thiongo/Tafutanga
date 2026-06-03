"use client";

import Link from "next/link";
import { Menu, X, Home, Search, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// nav items
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
  const [showMenuHint, setShowMenuHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMenuHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const isLandlordPath = pathname?.startsWith("/landlord");
  if (isLandlordPath) return null;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 transition-transform group-hover:scale-105 shrink-0">
              <img
                src="/main-logo.png"
                alt="Tafutanga Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav (Standard) */}
          <nav className="hidden items-center gap-3 md:flex">
            <Link
              href="/"
              className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${pathname === "/browse" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              Look for houses
            </Link>
            <Link
              href="/landlord/signin"
              className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${pathname?.startsWith("/landlord") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              List a house
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="relative flex flex-col items-end gap-2 md:hidden">
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setShowMenuHint(false);
              }}
              className="inline-flex h-12 items-center gap-2.5 rounded-2xl border border-border bg-background/90 px-6 py-3 text-base font-bold shadow-md hover:bg-muted transition-all active:scale-95"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
              Menu
            </button>
            {showMenuHint && (
              <div className="absolute top-full right-0 z-50 mt-2 flex items-center justify-between gap-2.5 rounded-2xl bg-primary pl-4 pr-3 py-2 text-[11px] font-bold text-primary-foreground shadow-xl animate-in fade-in slide-in-from-top-2 duration-500">
                <span>Use this for navigation</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenuHint(false);
                  }}
                  className="rounded-full p-0.5 hover:bg-white/20 text-primary-foreground/80 transition-colors"
                  aria-label="Dismiss hint"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="absolute -top-1.5 right-6 h-3 w-3 rotate-45 bg-primary" />
              </div>
            )}
          </div>
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
            className={`inline-flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-colors ${active
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


    </div>
  );
}