"use client";

import { create } from "zustand";

const STORAGE_KEY = "tafutanga:landlordAuth";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function readPersistedAuth() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? safeParse(raw) : null;
  } catch {
    return null;
  }
}

function persistAuth(nextState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        accessToken: nextState.accessToken,
        refreshToken: nextState.refreshToken,
      }),
    );
  } catch {
    // Persistence failure should not block the session.
  }
}

export const useLandlordAuthStore = create((set, get) => ({
  hasHydrated: false,
  accessToken: null,
  refreshToken: null,

  hydrate: () => {
    const persisted = readPersistedAuth();
    set({
      hasHydrated: true,
      accessToken: persisted?.accessToken ?? null,
      refreshToken: persisted?.refreshToken ?? null,
    });
  },

  setTokens: ({ accessToken, refreshToken }) => {
    // Keep tokens in sync to avoid half-authenticated states.
    const nextState = { accessToken: accessToken ?? null, refreshToken: refreshToken ?? null };
    persistAuth(nextState);
    set(nextState);
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    set({ accessToken: null, refreshToken: null });
    
    // Clear property cache on sign out to prevent data leakage between sessions.
    try {
      const { usePropertyStore } = require("./propertyStore");
      usePropertyStore.getState().clear();
    } catch {}
  },


  isAuthenticated: () => Boolean(get().accessToken),
}));

