"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PlusCircle, ListChecks, Building2 } from "lucide-react";

export function LandlordDashboardClient() {
  const [ready, setReady] = useState(true);

  useEffect(() => {
    // No artificial delay needed.
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
              Add listings, keep rooms available accurate, and respond fast to demand in Nairobi & Thika Road.
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickLinkCard
          href="/landlord/units/new"
          icon={Building2}
          title="Register a unit"
          description="Add a building or compound before posting rooms."
        />
        <QuickLinkCard
          href="/landlord/rooms/new"
          icon={PlusCircle}
          title="List a room vacancy"
          description="Post a new room type and upload a photo."
        />
        <QuickLinkCard
          href="/landlord/listings"
          icon={ListChecks}
          title="View my listings"
          description="Review, edit, and delete room listings."
        />
      </div>
    </div>
  );
}

function QuickLinkCard({ href, icon: Icon, title, description }) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-border bg-card p-6 transition hover:bg-muted"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="truncate font-semibold">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </Link>
  );
}

