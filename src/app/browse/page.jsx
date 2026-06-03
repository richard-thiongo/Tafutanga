"use client";

import { useEffect, useState, useMemo } from "react";
import { useBrowseStore } from "@/domain/browseStore";
import { fetchPublicListings } from "@/domain/browseActions";
import { ListingCard } from "@/ui/ListingCard";
import { Search, X, Loader2, SlidersHorizontal, MapPin, Banknote } from "lucide-react";

/**
 * BrowsePage allows users to search through available house listings in Nairobi.
 * Features a clean search bar and a floating filter button for price/location.
 */
export default function BrowsePage() {
  const { listings, meta, isLoading, error, hasLoaded } = useBrowseStore();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showFilterHint, setShowFilterHint] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPublicListings(currentPage, 20, true);
    
    // Hide filter hint after 3 seconds
    const timer = setTimeout(() => setShowFilterHint(false), 5000);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Get unique locations for filter
  const locations = useMemo(() => {
    const l = new Set(["All Locations"]);
    listings.forEach(listing => {
      if (listing.place) l.add(listing.place);
    });
    return Array.from(l).sort();
  }, [listings]);

  // Apply all filters
  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      const matchesSearch = !searchQuery || 
        listing.unit_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.place?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.county?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = !maxPrice || Number(listing.price) <= Number(maxPrice);
      const matchesLocation = selectedLocation === "All Locations" || listing.place === selectedLocation;

      return matchesSearch && matchesPrice && matchesLocation;
    });
  }, [listings, searchQuery, maxPrice, selectedLocation]);

  const clearFilters = () => {
    setSearchQuery("");
    setMaxPrice("");
    setSelectedLocation("All Locations");
    setIsFilterOpen(false);
  };

  const activeFilterCount = (maxPrice ? 1 : 0) + (selectedLocation !== "All Locations" ? 1 : 0);

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Find your home in <span className="text-primary">Nairobi & Thika Road</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground mx-auto">
            Browse verified listings across Nairobi and along Thika Road.
          </p>
        </div>

        {/* Sticky Search Bar */}
        <div className="sticky top-[72px] z-30 -mx-6 mb-12 bg-background/80 px-6 py-4 backdrop-blur-md md:top-[88px]">
          <div className="mx-auto max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by area, county, or unit name..."
                className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-10 text-sm font-medium shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/5"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {isLoading && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                  Updating...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {maxPrice && (
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary border border-primary/20">
                Under KSh {maxPrice}
                <button onClick={() => setMaxPrice("")}><X className="h-3 w-3" /></button>
              </div>
            )}
            {selectedLocation !== "All Locations" && (
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary border border-primary/20">
                {selectedLocation}
                <button onClick={() => setSelectedLocation("All Locations")}><X className="h-3 w-3" /></button>
              </div>
            )}
            <button onClick={clearFilters} className="text-xs font-bold text-muted-foreground hover:text-foreground underline ml-2">Clear all</button>
          </div>
        )}

        {/* Listings Grid */}
        {isLoading && !hasLoaded ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[420px] animate-pulse rounded-[2.5rem] bg-muted" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-border py-20 text-center">
            <h2 className="text-xl font-bold">Something went wrong</h2>
            <p className="mb-6 text-muted-foreground">{error}</p>
            <button
              onClick={() => fetchPublicListings(true)}
              className="rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Try Again
            </button>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-border py-24 text-center bg-muted/20">
            <Search className="mb-4 h-12 w-12 text-muted-foreground opacity-20" />
            <h2 className="text-xl font-bold">No matches found</h2>
            <p className="text-muted-foreground max-w-xs mx-auto">Try a different search or adjust your filters.</p>
            <button onClick={clearFilters} className="mt-6 text-sm font-bold text-primary hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && hasLoaded && meta && meta.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-xl border border-border px-4 py-2 text-sm font-bold disabled:opacity-50 transition-colors hover:bg-muted"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-muted-foreground mx-4">
              Page {currentPage} of {meta.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(meta.totalPages, p + 1))}
              disabled={currentPage === meta.totalPages}
              className="rounded-xl border border-border px-4 py-2 text-sm font-bold disabled:opacity-50 transition-colors hover:bg-muted"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button for Filters */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        {showFilterHint && (
          <div className="relative rounded-2xl bg-primary px-4 py-2 text-[11px] font-bold text-primary-foreground shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            Filter to see your preferences
            {/* Chat bubble tail */}
            <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-primary" />
          </div>
        )}
        <button
          onClick={() => {
            setIsFilterOpen(true);
            setShowFilterHint(false);
          }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_32px_rgba(37,99,235,0.4)] transition-all hover:scale-110 active:scale-95 relative"
        >
          <SlidersHorizontal className="h-6 w-6" />
          {activeFilterCount > 0 && (
            <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground border-2 border-background animate-in zoom-in">
              {activeFilterCount}
            </div>
          )}
        </button>
      </div>

      {/* Filter Drawer/Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-background p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="rounded-full bg-muted p-2 hover:bg-muted/80">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Price Filter */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  <Banknote className="h-4 w-4" />
                  Max Price (KSh)
                </div>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 15000"
                  className="h-14 w-full rounded-2xl border border-border bg-muted/30 px-5 text-lg font-bold focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Location Filter */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="h-14 w-full appearance-none rounded-2xl border border-border bg-muted/30 px-5 text-lg font-bold focus:border-primary focus:outline-none cursor-pointer transition-colors"
                >
                  {locations.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button
                onClick={clearFilters}
                className="h-14 flex-1 rounded-2xl border border-border font-bold hover:bg-muted transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="h-14 flex-[2] rounded-2xl bg-primary font-bold text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
