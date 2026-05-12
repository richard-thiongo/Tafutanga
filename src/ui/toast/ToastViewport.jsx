"use client";

import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useToastStore } from "./toastStore";

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-[100] flex flex-col items-center gap-3 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex w-full max-w-sm animate-in fade-in slide-in-from-top-4 items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-md transition-all ${toastClasses(toast.type)}`}
          role="status"
          aria-live="polite"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-background/50">
            <ToastIcon type={toast.type} />
          </div>
          <div className="min-w-0 flex-1 text-sm font-medium leading-tight">
            {toast.message}
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="shrink-0 rounded-lg border border-border bg-background/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            Close
          </button>
        </div>
      ))}
    </div>
  );
}

function ToastIcon({ type }) {
  if (type === "success") {
    return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />;
  }
  if (type === "error") {
    return <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />;
  }
  return <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />;
}

function toastClasses(type) {
  if (type === "success") {
    return "border-emerald-500/20 bg-emerald-50/90 text-emerald-900 dark:bg-emerald-950/90 dark:text-emerald-50";
  }
  if (type === "error") {
    return "border-red-500/20 bg-red-50/90 text-red-900 dark:bg-red-950/90 dark:text-red-50";
  }
  return "border-primary/20 bg-background/90 text-foreground";
}


