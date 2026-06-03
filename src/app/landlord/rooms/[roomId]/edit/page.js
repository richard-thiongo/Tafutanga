"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BadgeDollarSign, Home, Upload } from "lucide-react";
import Link from "next/link";
import { getMyListings } from "@/domain/propertyActions";
import { updateRoomListing } from "@/domain/propertyActions";

export default function EditRoomListingPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId;

  const [isLoading, setIsLoading] = useState(true);
  const [roomType, setRoomType] = useState("");
  const [roomsAvailable, setRoomsAvailable] = useState("0");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    async function load() {
      setIsLoading(true);
      setError("");
      try {
        const listings = await getMyListings();
        if (!isActive) return;

        const found = listings.find((l) => String(l.id) === String(roomId));
        if (!found) {
          setError("Listing not found");
          return;
        }

        setRoomType(found.room_type || "");
        setRoomsAvailable(String(found.rooms_available ?? 0));
        setPrice(String(found.price ?? ""));
        setDescription(found.description || "");
        setCurrentImageUrl(found.image_url || "");
        setImageUrl(found.image_url || "");
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load listing");
      } finally {
        if (!isActive) return;
        setIsLoading(false);
      }
    }

    if (roomId) load();
    return () => {
      isActive = false;
    };
  }, [roomId]);

  const canSubmit = useMemo(() => {
    return roomId && roomType.trim() && price !== "" && Number(roomsAvailable) >= 0;
  }, [price, roomId, roomType, roomsAvailable]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError("");
    try {
      await updateRoomListing({ roomId, roomType, roomsAvailable, price, description, imageFile, imageUrl });
      router.push("/landlord/listings");
    } catch (err) {
      setError(err?.message || "Failed to update listing");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-3xl border border-border bg-card p-4 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight">Edit listing</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Update room availability and pricing to keep search results accurate.
            </p>
          </div>
          <Link
            href="/landlord/listings"
            className="inline-flex items-center justify-center rounded-2xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Back to listings
          </Link>
        </div>

        {error ? (
          <div className="mt-5 rounded-2xl border border-border bg-muted px-4 py-3 text-sm">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-5 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
            Loading listing…
          </div>
        ) : null}

        {!isLoading && !error ? (
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Room type
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
                  <Home className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <input
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    type="text"
                    placeholder="e.g. Bedsitter"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
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
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Price (KES)
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
                <BadgeDollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 30000"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
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
              Replace photo (optional)
              <div className="relative flex min-h-[56px] flex-col items-start justify-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    {imageFile
                      ? imageFile.name
                      : currentImageUrl
                        ? "Current photo is set"
                        : "No photo on this listing"}
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
              {isSubmitting ? "Saving…" : "Save changes"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

