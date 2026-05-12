"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Building2, MapPin } from "lucide-react";
import { createUnit } from "@/domain/landlordProperties/useCases/createUnit";

export default function NewUnitPage() {
  const router = useRouter();
  const [unitName, setUnitName] = useState("");
  const [county, setCounty] = useState("");
  const [place, setPlace] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return unitName.trim() && county.trim() && place.trim();
  }, [county, place, unitName]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setIsSubmitting(true);
    try {
      await createUnit({ unitName, county, place });
      router.push("/landlord/rooms/new");
    } catch (err) {
      setError(err?.message || "Failed to register unit");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Register a unit</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A unit is a building or compound. You will attach room listings to it.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-border bg-muted px-4 py-3 text-sm">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <Field
            label="Unit name"
            icon={Building2}
            value={unitName}
            onChange={setUnitName}
            placeholder="e.g. Riverside Court"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="County"
              icon={MapPin}
              value={county}
              onChange={setCounty}
              placeholder="e.g. Nairobi"
            />
            <Field
              label="Place / Estate"
              icon={MapPin}
              value={place}
              onChange={setPlace}
              placeholder="e.g. Kilimani"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {isSubmitting ? "Saving…" : "Save unit"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, value, onChange, placeholder }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </div>
    </label>
  );
}

