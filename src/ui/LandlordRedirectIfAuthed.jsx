"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLandlordAuthStore } from "@/domain/authStore";

export function LandlordRedirectIfAuthed({ children }) {
  const router = useRouter();
  const hasHydrated = useLandlordAuthStore((s) => s.hasHydrated);
  const hydrate = useLandlordAuthStore((s) => s.hydrate);
  const accessToken = useLandlordAuthStore((s) => s.accessToken);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (accessToken) router.replace("/landlord");
  }, [accessToken, hasHydrated, router]);

  if (!hasHydrated) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-6 py-20">
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading landlord session…
        </div>
      </div>
    );
  }

  return children;
}

