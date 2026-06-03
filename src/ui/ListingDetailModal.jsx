"use client";

import { X, MapPin, Banknote, ImageIcon } from "lucide-react";
import { useEffect } from "react";

export function ListingDetailModal({ listing, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!listing) return null;

  const unitLabel = [listing?.unit_name, listing?.place, listing?.county].filter(Boolean).join(" • ");
  const price = typeof listing?.price === "number" ? listing.price : Number(listing?.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-4 sm:px-6">
          <h2 className="text-lg font-semibold truncate">Listing Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            {/* Image Section */}
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-muted">
              {listing?.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={listing?.room_type || "Listing photo"}
                  src={listing.image_url}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Main Info */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {listing?.room_type || "Room listing"}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {unitLabel || "Location not set"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Banknote className="h-4 w-4" aria-hidden="true" />
                    KES {Number.isFinite(price) ? price.toLocaleString() : String(listing?.price ?? "")}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    Available: {listing?.rooms_available ?? 0}
                  </span>
                </div>
              </div>

              {/* Description */}
              {listing?.description ? (
                <div className="rounded-2xl border border-border bg-background p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Description</h4>
                  <p className="mt-2 text-base text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {listing.description}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No description provided.</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border p-4 sm:px-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
