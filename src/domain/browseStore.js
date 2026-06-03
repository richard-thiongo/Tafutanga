"use client";

import { create } from "zustand";

/**
 * Store for managing public listings and caching.
 */
export const useBrowseStore = create((set) => ({
  listings: [],
  meta: null,
  hasLoaded: false,
  isLoading: false,
  error: null,

  setListings: (listings, meta) => set({ listings, meta, hasLoaded: true, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  
  clear: () => set({ listings: [], meta: null, hasLoaded: false, isLoading: false, error: null }),
}));
