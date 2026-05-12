"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Mail, Phone, User, Lock } from "lucide-react";
import { signupLandlord } from "@/domain/landlordAuth/useCases/signupLandlord";

export default function LandlordSignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return fullName.trim() && phoneNumber.trim() && email.trim() && password.length >= 6;
  }, [email, fullName, password.length, phoneNumber]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setIsSubmitting(true);
    try {
      await signupLandlord({ fullName, phoneNumber, email, password });
      router.replace("/landlord");
    } catch (err) {
      setError(err?.message || "Sign up failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create account to list</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          List your available rooms and keep your details up to date.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Full name
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
              <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Phone number
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
              <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="07xx xxx xxx"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </label>

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
            Password (min 6)
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
              <Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {isSubmitting ? "Creating…" : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/landlord/signin" className="font-medium text-foreground underline">
            Sign in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

