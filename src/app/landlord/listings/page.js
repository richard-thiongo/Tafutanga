"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Image as ImageIcon, MapPin, Banknote } from "lucide-react";
import { getMyListings } from "@/domain/propertyActions";
import { deleteRoomListing } from "@/domain/propertyActions";

import { usePropertyStore } from "@/domain/propertyStore";
import { ListingDetailModal } from "@/ui/ListingDetailModal";
import { ConfirmModal } from "@/ui/ConfirmModal";


export default function LandlordListingsPage() {
  const listings = usePropertyStore((s) => s.listings);
  const setListings = usePropertyStore((s) => s.setListings);
  const deleteListing = usePropertyStore((s) => s.deleteListing);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    let isActive = true;
    async function load() {
      setError("");
      // Only show loading if we don't have data yet.
      if (listings.length === 0) setIsLoading(true);
      
      try {
        const data = await getMyListings();
        if (!isActive) return;
        setListings(data);
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load listings");
      } finally {
        if (!isActive) return;
        setIsLoading(false);
      }
    }
    load();
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasListings = listings.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight">My listings</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep rooms available accurate so search results stay trustworthy.
            </p>
          </div>
          <Link
            href="/landlord/rooms/new"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
          >
            Add listing
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-border bg-card p-6 text-sm">{error}</div>
      ) : null}

      {isLoading && listings.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading listings…
        </div>
      ) : null}

      {!isLoading && !hasListings ? (
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-sm text-muted-foreground">
            No listings yet. Add your first room listing to appear in search.
          </div>
          <div className="mt-4">
            <Link
              href="/landlord/rooms/new"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
            >
              Add listing
            </Link>
          </div>
        </div>
      ) : null}

      {hasListings ? (
        <div className="grid grid-cols-1 gap-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isDeleting={deletingId === listing.id}
              onView={() => setSelectedListing(listing)}
              onDelete={(e) => {
                e.stopPropagation();
                setItemToDelete(listing);
              }}
            />
          ))}
        </div>
      ) : null}

      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Delete listing?"
        description="This action cannot be undone. This room will be removed from all search results immediately."
        confirmLabel={deletingId ? "Deleting..." : "Delete Listing"}
        onConfirm={async () => {
          if (!itemToDelete || deletingId) return;
          const id = itemToDelete.id;
          setDeletingId(id);
          try {
            await deleteRoomListing({ roomId: id });
            deleteListing(id);
            setItemToDelete(null);
          } catch (err) {
            setError(err?.message || "Failed to delete listing");
          } finally {
            setDeletingId(null);
          }
        }}
        onCancel={() => setItemToDelete(null)}
      />

      {selectedListing ? (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      ) : null}
    </div>
  );
}

function ListingCard({ listing, onDelete, onView, isDeleting }) {

  const [showFullDescription, setShowFullDescription] = useState(false);
  const unitLabel = [listing?.unit_name, listing?.place, listing?.county].filter(Boolean).join(" • ");
  const price = typeof listing?.price === "number" ? listing.price : Number(listing?.price);
  const description = listing?.description || "";
  
  // Word limit for truncation.
  const isLongDescription = description.split(" ").length > 20;
  const displayDescription = showFullDescription || !isLongDescription
    ? description
    : description.split(" ").slice(0, 20).join(" ") + "...";

  return (
    <div 
      onClick={onView}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted transition-transform group-hover:scale-105">
            {listing?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={listing?.room_type ? `${listing.room_type} listing photo` : "Listing photo"}
                src={listing.image_url}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <ImageIcon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-semibold group-hover:text-primary transition-colors">
              {listing?.room_type || "Room listing"}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex min-w-0 max-w-full items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span className="min-w-0 truncate">{unitLabel || "Unit location"}</span>
              </span>
              <span className="inline-flex min-w-0 max-w-full items-center gap-1">
                <Banknote className="h-4 w-4" aria-hidden="true" />
                <span className="min-w-0 truncate">
                  KES {Number.isFinite(price) ? price.toLocaleString() : String(listing?.price ?? "")}
                </span>
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                Available: {listing?.rooms_available ?? 0}
              </span>
            </div>
            
            {description ? (
              <div className="mt-3">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {displayDescription}
                </p>
                {isLongDescription && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFullDescription(!showFullDescription);
                    }}
                    className="mt-1 text-xs font-semibold text-primary hover:underline"
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2 sm:justify-end">
          <Link
            href={`/landlord/rooms/${listing.id}/edit`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-muted"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Edit
          </Link>
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/20 bg-background px-4 py-2 text-sm font-semibold text-red-600 whitespace-nowrap transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}



