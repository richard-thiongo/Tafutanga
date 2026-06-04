"use client";

import { create } from "zustand";

/**
 * Store for managing public listings and caching.
 */
export const useBrowseStore = create((set) => ({
  listings: [],
  meta: null,
  lastFetchedPage: null,
  hasLoaded: false,
  isLoading: false,
  error: null,

  setListings: (listings, meta, page) => set({ listings, meta, lastFetchedPage: page, hasLoaded: true, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  
  clear: () => set({ listings: [], meta: null, lastFetchedPage: null, hasLoaded: false, isLoading: false, error: null }),
}));
