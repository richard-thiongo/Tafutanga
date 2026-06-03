"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { LandlordRedirectIfAuthed } from "@/ui/LandlordRedirectIfAuthed";
import { AuthGuard } from "@/ui/AuthGuard";
import { DashboardSidebar } from "@/ui/DashboardSidebar";

export default function LandlordLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current route is an authentication page to choose the right wrapper layout
  const isAuthPage = pathname === "/landlord/signin" || pathname === "/landlord/signup";

  if (isAuthPage) {
    return (
      <LandlordRedirectIfAuthed>
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="truncate text-base font-semibold">Tafutanga</div>
                <div className="truncate text-sm text-muted-foreground">Landlord access</div>
              </div>
            </Link>

            <Link
              href="/"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Back to home
            </Link>
          </div>

          <div className="mt-10">{children}</div>
        </div>
      </LandlordRedirectIfAuthed>
    );
  }

  return (
    <AuthGuard>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold">Management workspace</div>
              <div className="truncate text-sm text-muted-foreground">
                Manage units and listings for Tafutanga
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <DashboardSidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
