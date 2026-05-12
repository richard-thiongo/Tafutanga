"use client";

import Link from "next/link";
import { Building2, Home, LayoutDashboard, ListChecks, Menu, PlusCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LandlordUserMenu } from "../../_components/LandlordUserMenu";
import { ThemeToggle } from "@/ui/theme/ThemeToggle";


const NAV_ITEMS = [
  { href: "/landlord", label: "Dashboard", icon: LayoutDashboard, match: "exact" },
  { href: "/landlord/units/new", label: "Register a unit", icon: Building2, match: "prefix" },
  { href: "/landlord/rooms/new", label: "List a room vacancy", icon: PlusCircle, match: "prefix", primary: true },
  { href: "/landlord/listings", label: "View my listings", icon: ListChecks, match: "prefix" },
  { href: "/landlord/units", label: "Managed units", icon: Building2, match: "exact" },
  { href: "/", label: "Back home", icon: Home, match: "exact" },
];


function isActive(pathname, item) {
  if (!pathname) return false;
  if (item.match === "exact") return pathname === item.href;
  return pathname.startsWith(item.href);
}

export function LandlordSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <div className="sticky top-4 z-40 mb-4 flex lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-md hover:bg-muted"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
          Menu
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-72 max-w-[85vw] animate-in slide-in-from-left border-r border-border bg-background/95 p-4 backdrop-blur-lg">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm font-black uppercase tracking-widest text-muted-foreground opacity-50">
                Management
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/50"
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
            className="flex-1 bg-black/40 animate-in fade-in"
          />
        </div>
      ) : null}

      {/* Desktop Sidebar */}
      <aside className="sticky top-4 hidden h-fit lg:block">
        <div className="w-64 rounded-[2rem] border border-border bg-card/50 p-4 backdrop-blur-md">
          <div className="mb-4 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">
            Navigation
          </div>
          <SidebarContent pathname={pathname} />
        </div>
      </aside>
    </>
  );
}

function SidebarContent({ pathname, onNavigate }) {
  return (
    <div className="flex flex-col gap-1.5">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item);
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group relative flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all ${
              item.primary
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:opacity-90"
                : active
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${active && !item.primary ? "text-primary" : ""}`} />
            <span className="truncate">{item.label}</span>
            {active && !item.primary && (
              <div className="absolute left-0 h-4 w-1 rounded-r-full bg-primary" />
            )}
          </Link>
        );
      })}

      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
        <div className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">
          Preferences
        </div>
        <ThemeToggle className="w-full justify-start rounded-2xl px-4 py-2.5 text-sm font-medium hover:bg-muted" />
        <LandlordUserMenu
          onSignedOut={onNavigate}
          label="Account settings"
          className="w-full justify-start rounded-2xl px-4 py-2.5 text-sm font-medium hover:bg-muted"
        />
      </div>
    </div>
  );
}

