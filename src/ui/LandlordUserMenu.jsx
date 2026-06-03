"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLandlordAuthStore } from "@/domain/authStore";

export function LandlordUserMenu({ className = "", onSignedOut }) {
  const router = useRouter();
  const clear = useLandlordAuthStore((s) => s.clear);

  return (
    <button
      type="button"
      onClick={() => {
        clear();
        onSignedOut?.();
        router.push("/landlord/signin");
      }}
      className={`inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-background px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 ${className}`}
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Sign out
    </button>
  );
}

