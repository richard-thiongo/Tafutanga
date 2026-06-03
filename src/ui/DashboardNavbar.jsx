"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LandlordUserMenu } from "@/ui/LandlordUserMenu";

const NAV_ITEMS = [
  { href: "/landlord", label: "Dashboard", match: "exact" },
  { href: "/", label: "Home", match: "prefix" },
  { href: "/landlord/listings", label: "My listings", match: "prefix" },
  { href: "/landlord/units/new", label: "Register unit", match: "prefix" },
  { href: "/landlord/rooms/new", label: "Add listing", match: "prefix" },
];

function isActive(pathname, item) {
  if (!pathname) return false;
  if (item.match === "exact") return pathname === item.href;
  return pathname.startsWith(item.href);
}

export function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <nav className="overflow-x-auto" aria-label="Landlord navigation">
      <div className="flex min-w-max items-center gap-2 pr-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item);
          const activeClass = item.primary
            ? "bg-primary text-primary-foreground"
            : active
              ? "border-primary bg-muted text-foreground"
              : "border-border bg-background text-foreground hover:bg-muted";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap ${activeClass}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
        <LandlordUserMenu />
      </div>
    </nav>
  );
}

