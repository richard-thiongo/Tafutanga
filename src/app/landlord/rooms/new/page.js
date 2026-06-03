"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { Building2, Upload, BadgeDollarSign, Home, ChevronDown, Check } from "lucide-react";
import { getMyUnits } from "@/domain/propertyActions";
import { formatUnitLabel } from "@/domain/propertyTypes";
import { createRoomListing } from "@/domain/propertyActions";

export default function NewRoomListingPage() {
  const router = useRouter();

  const [units, setUnits] = useState([]);
  const [unitId, setUnitId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomsAvailable, setRoomsAvailable] = useState("1");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [isLoadingUnits, setIsLoadingUnits] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close unit dropdown selection list when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    async function loadUnits() {
      setIsLoadingUnits(true);
      setError("");
      try {
        const data = await getMyUnits();
        if (!isActive) return;
        setUnits(data);
        if (!unitId && data?.[0]?.id) setUnitId(data[0].id);
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load units");
      } finally {
        if (!isActive) return;
        setIsLoadingUnits(false);
      }
    }
    loadUnits();
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSubmit = useMemo(() => {
    return unitId && roomType.trim() && price !== "" && Number(roomsAvailable) >= 0;
  }, [price, roomType, roomsAvailable, unitId]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError("");
    try {
      await createRoomListing({ unitId, roomType, roomsAvailable, price, description, imageFile, imageUrl });
      router.push("/landlord/listings");
    } catch (err) {
      setError(err?.message || "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasUnits = units.length > 0;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-3xl border border-border bg-card p-4 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold tracking-tight">Add room listing</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a unit, add pricing, and upload a clear photo.
            </p>
          </div>
          <Link
            href="/landlord/units/new"
            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
          >
            <Building2 className="h-4 w-4" aria-hidden="true" />
            New unit
          </Link>
        </div>

        {error ? (
          <div className="mt-5 rounded-2xl border border-border bg-muted px-4 py-3 text-sm">
            {error}
          </div>
        ) : null}

        {isLoadingUnits ? (
          <div className="mt-5 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
            Loading units…
          </div>
        ) : null}

        {!isLoadingUnits && !hasUnits ? (
          <div className="mt-5 rounded-2xl border border-border bg-background px-4 py-4">
            <div className="text-sm text-muted-foreground">
              You do not have any units yet. Register a unit first, then add room listings.
            </div>
            <div className="mt-4">
              <Link
                href="/landlord/units/new"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
              >
                Register a unit
              </Link>
            </div>
          </div>
        ) : null}

        {!isLoadingUnits && hasUnits ? (
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-2 text-sm font-medium" ref={dropdownRef}>
              <span>Unit</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm transition-all hover:bg-muted/50 focus:border-primary focus:outline-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="truncate">
                      {units.find((u) => u.id === unitId)
                        ? formatUnitLabel(units.find((u) => u.id === unitId))
                        : "Select unit"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-border bg-card/95 p-1.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
                    {units.map((u) => {
                      const isSelected = u.id === unitId;
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            setUnitId(u.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                            isSelected
                              ? "bg-primary/10 text-primary font-semibold"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <span className="truncate">{formatUnitLabel(u)}</span>
                          {isSelected && (
                            <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Room type
                <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
                  <Home className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <input
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    type="text"
                    placeholder="e.g. Bedsitter"
                    className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Rooms available
                <input
                  value={roomsAvailable}
                  onChange={(e) => setRoomsAvailable(e.target.value)}
                  type="number"
                  min="0"
                  step="1"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Price (KES)
              <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
                <BadgeDollarSign className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 30000"
                  className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Description (optional)
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the room, amenities, and any other details..."
                className="resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Image URL (optional)
              <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
                <Upload className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  type="text"
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                  className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Photo (optional)
              <div className="relative flex min-h-[56px] flex-col items-start justify-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    {imageFile ? imageFile.name : "Upload a clear room photo"}
                  </span>
                </div>
                <div className="relative inline-flex items-center justify-center rounded-xl bg-muted px-3 py-1.5 text-xs font-semibold hover:bg-muted/80">
                  {imageFile ? "Change" : "Choose file"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </label>

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {isSubmitting ? "Posting…" : "Post listing"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

