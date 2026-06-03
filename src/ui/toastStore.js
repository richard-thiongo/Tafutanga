"use client";

import { create } from "zustand";

export const useToastStore = create((set, get) => ({
  toasts: [],
  pushToast: ({ type = "info", message }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));

    if (type !== "error") {
      window.setTimeout(() => {
        get().removeToast(id);
      }, 3000);
    }
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

