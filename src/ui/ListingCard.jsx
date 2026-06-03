"use client";

import { MapPin, Clock } from "lucide-react";
import { formatRelativeTime } from "@/domain/browseTime";

/**
 * Renders a single property listing card.
 * @param {Object} props
 * @param {Object} props.listing - The listing data.
 */
export function ListingCard({ listing }) {
  const {
    room_type,
    price,
    image_url,
    unit_name,
    county,
    place,
    created_at,
    rooms_available,
    landlord_name,
    contact,
    description
  } = listing;

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-md">
      {/* Image section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {image_url ? (
          <img
            src={image_url}
            alt={`${room_type} in ${unit_name}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
        <div className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          {room_type}
        </div>
        <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          KSh {Number(price).toLocaleString()}
        </div>
      </div>

      {/* Details section */}
      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-lg font-bold leading-tight">{unit_name}</h3>
        </div>

        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{place}, {county}</span>
        </div>

        {description && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        <div className="mb-4 flex flex-wrap gap-2">
          <div className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {rooms_available} {rooms_available === 1 ? "Unit" : "Units"} Left
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Contact</span>
            <span className="text-sm font-semibold truncate max-w-[120px]">{contact}</span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatRelativeTime(created_at)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
