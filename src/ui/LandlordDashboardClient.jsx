"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PlusCircle, ListChecks, Building2 } from "lucide-react";

export function LandlordDashboardClient() {
  const [ready, setReady] = useState(true);

  useEffect(() => {
    // Ready state
  }, []);

  if (!ready) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted sm:w-2/3" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-36 animate-pulse rounded-3xl border border-border bg-card" />
          <div className="h-36 animate-pulse rounded-3xl border border-border bg-card" />
          <div className="h-36 animate-pulse rounded-3xl border border-border bg-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Add listings, keep rooms available accurate, and respond fast to demand in Nairobi.
            </p>
          </div>
          <Link
            href="/landlord/rooms/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            List a vacancy
          </Link>
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Getting started guide</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Follow these three steps to successfully list your properties and attract house hunters in Nairobi. Click any card to proceed.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link 
            href="/landlord/units/new" 
            className="group relative flex flex-col gap-2 rounded-2xl border border-border bg-background/50 p-5 transition hover:bg-muted"
          >
            <div className="absolute top-4 right-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Step 1</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-2 font-semibold">Register your unit</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A unit represents your physical building or compound (e.g., Riverside Court in Kilimani). You must register at least one unit before listing any vacancies.
            </p>
            <div className="mt-4 text-xs font-semibold text-primary group-hover:underline">
              Register unit &rarr;
            </div>
          </Link>

          <Link 
            href="/landlord/rooms/new" 
            className="group relative flex flex-col gap-2 rounded-2xl border border-border bg-background/50 p-5 transition hover:bg-muted"
          >
            <div className="absolute top-4 right-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Step 2</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <PlusCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-2 font-semibold">List a room vacancy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Select your registered unit from the dropdown, specify the room type (e.g., Bedsitter), price, and availability. You can upload a photo or paste an image URL directly.
            </p>
            <div className="mt-4 text-xs font-semibold text-primary group-hover:underline">
              Add room vacancy &rarr;
            </div>
          </Link>

          <Link 
            href="/landlord/listings" 
            className="group relative flex flex-col gap-2 rounded-2xl border border-border bg-background/50 p-5 transition hover:bg-muted"
          >
            <div className="absolute top-4 right-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Step 3</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <ListChecks className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-2 font-semibold">Keep listings updated</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use your dashboard to update room pricing and availability when rooms are occupied, ensuring house hunters always see correct and active vacancies.
            </p>
            <div className="mt-4 text-xs font-semibold text-primary group-hover:underline">
              View & edit listings &rarr;
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
