"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { signinLandlord } from "@/domain/landlordAuth/useCases/signinLandlord";

export default function LandlordSigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => email.trim() && password, [email, password]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setIsSubmitting(true);
    try {
      await signinLandlord({ email, password });
      router.replace("/landlord");
    } catch (err) {
      setError(err?.message || "Sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to list</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your units and manage room listings on Tafutanga.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Email
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
              <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@example.com"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Password
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
              <Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-sm text-muted-foreground">
          No account yet?{" "}
          <Link href="/landlord/signup" className="font-medium text-foreground underline">
            Create one
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

