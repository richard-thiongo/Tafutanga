"use client";

import { create } from "zustand";

const TOAST_DURATION_MS = 3000;

export const useToastStore = create((set, get) => ({
  toasts: [],
  pushToast: ({ type = "info", message }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));

    window.setTimeout(() => {
      get().removeToast(id);
    }, TOAST_DURATION_MS);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

