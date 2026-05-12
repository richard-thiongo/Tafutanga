"use client";

import { useBrowseStore } from "../browseStore";
import { publicJson } from "../browseApiClient";

/**
 * Fetches all public listings and updates the browse store.
 * Uses caching to avoid re-fetching if already loaded.
 * @param {boolean} force - Whether to bypass cache.
 */
export async function fetchPublicListings(force = false) {
  const { setListings, setLoading, setError, hasLoaded } = useBrowseStore.getState();

  // Only show the blocking loading spinner if we have NO data yet or if it's a forced refresh
  if (!hasLoaded || force) {
    setLoading(true);
  }

  try {
    const data = await publicJson("/properties/all");
    setListings(data);
  } catch (error) {
    // If we already have data, don't break the UI with an error screen, just log it
    if (hasLoaded) {
      console.warn("Background refresh failed, using cache:", error);
    } else {
      setError(error.message || "Failed to load listings");
    }
  } finally {
    // Ensure loading is always turned off if we didn't use the setListings/setError paths
    setLoading(false);
  }
}
