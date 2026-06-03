"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { signinLandlord } from "@/domain/authActions";

export default function LandlordSigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load saved credentials on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("tafutanga_landlord_email");
      const savedPassword = localStorage.getItem("tafutanga_landlord_password");
      const savedRemember = localStorage.getItem("tafutanga_landlord_remember");
      
      if (savedEmail) setEmail(savedEmail);
      if (savedPassword) setPassword(savedPassword);
      if (savedRemember !== null) {
        setRememberMe(savedRemember === "true");
      }
    } catch (err) {
      // Ignore localStorage blockages in incognito mode
    }
  }, []);

  const canSubmit = useMemo(() => email.trim() && password, [email, password]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setIsSubmitting(true);
    try {
      await signinLandlord({ email, password });
      
      // Save or remove credentials based on choice
      try {
        if (rememberMe) {
          localStorage.setItem("tafutanga_landlord_email", email.trim());
          localStorage.setItem("tafutanga_landlord_password", password);
          localStorage.setItem("tafutanga_landlord_remember", "true");
        } else {
          localStorage.removeItem("tafutanga_landlord_email");
          localStorage.removeItem("tafutanga_landlord_password");
          localStorage.setItem("tafutanga_landlord_remember", "false");
        }
      } catch (err) {
        // Ignore localStorage blockages in incognito mode
      }

      router.replace("/landlord");
    } catch (err) {
      setError(err?.message || "Sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-border bg-card p-4 sm:p-8">
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
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background pl-4 pr-3 py-3">
              <Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Your password"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="rounded-full p-1 hover:bg-muted text-muted-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary/20"
              />
              <span>Remember me</span>
            </label>
          </div>

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

