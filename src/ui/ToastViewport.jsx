"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToastStore } from "./toastStore";

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  const regularToasts = toasts.filter((t) => t.type !== "error");
  const errorToasts = toasts.filter((t) => t.type === "error");

  return (
    <>
      {errorToasts.length > 0 && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 rounded-xl border border-red-200 bg-white p-6 shadow-xl dark:bg-card">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-6 w-6 shrink-0" />
              <h3 className="text-lg font-semibold">Error</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{errorToasts[0].message}</p>
            <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-900 border border-red-100 dark:bg-red-950/30 dark:text-red-200 dark:border-red-900/50">
              <strong className="block mb-1">Suggested Fix:</strong>
              {getSuggestedFix(errorToasts[0].message)}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => removeToast(errorToasts[0].id)}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 w-full max-w-sm pt-6">
        {regularToasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-full max-w-sm animate-in fade-in slide-in-from-top-4 items-center gap-3 rounded-md px-4 py-3 shadow-lg transition-all ${toastClasses(toast.type)}`}
            role="status"
            aria-live="polite"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white/20">
              <ToastIcon type={toast.type} />
            </div>
            <div className="min-w-0 flex-1 text-sm font-medium leading-tight">
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded p-1 text-current opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function ToastIcon({ type }) {
  if (type === "success") {
    return <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400 animate-draw" aria-hidden="true" />;
  }
  return <Info className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />;
}

function toastClasses(type) {
  if (type === "success") {
    return "bg-green-950/80 backdrop-blur-md text-white border border-green-800/50 shadow-[0_0_15px_rgba(22,163,74,0.15)]";
  }
  return "bg-gray-800 text-white border-2 border-gray-900";
}

function getSuggestedFix(message) {
  const msg = (message || "").toLowerCase();
  if (msg.includes("session") || msg.includes("sign in")) {
    return "Please navigate to the login screen and sign in to your account again to renew your session.";
  }
  if (msg.includes("required") || msg.includes("invalid")) {
    return "Please double-check the form fields highlighted or mentioned to ensure you have entered valid information.";
  }
  if (msg.includes("not allowed") || msg.includes("forbidden") || msg.includes("permission")) {
    return "You might need different permissions or to be the owner of this resource. Please contact support if you believe this is a mistake.";
  }
  if (msg.includes("network") || msg.includes("fetch") || msg.includes("failed")) {
    return "Ensure your internet connection is active and that the API server is currently running.";
  }
  return "Please try refreshing the page or attempting your action again. If it continues to fail, contact support.";
}


