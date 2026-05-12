"use client";

import { create } from "zustand";

export const usePropertyStore = create((set) => ({
  listings: [],
  units: [],
  hasLoadedListings: false,
  hasLoadedUnits: false,

  setListings: (listings) => set({ listings, hasLoadedListings: true }),
  setUnits: (units) => set({ units, hasLoadedUnits: true }),

  addListing: (listing) =>
    set((state) => ({ listings: [listing, ...state.listings] })),

  updateListing: (listing) =>
    set((state) => ({
      listings: state.listings.map((l) => (l.id === listing.id ? listing : l)),
    })),

  deleteListing: (id) =>
    set((state) => ({
      listings: state.listings.filter((l) => l.id !== id),
    })),

  addUnit: (unit) => set((state) => ({ units: [unit, ...state.units] })),
  
  updateUnit: (unit) =>
    set((state) => ({
      units: state.units.map((u) => (u.id === unit.id ? unit : u)),
    })),

  deleteUnit: (id) =>
    set((state) => ({
      units: state.units.filter((u) => u.id !== id),
    })),
  
  clear: () => set({ listings: [], units: [], hasLoadedListings: false, hasLoadedUnits: false }),
}));
