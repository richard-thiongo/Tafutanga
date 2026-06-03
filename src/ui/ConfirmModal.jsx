"use client";

import { AlertCircle, X } from "lucide-react";

/**
 * A premium confirmation modal for destructive actions.
 */
export function ConfirmModal({ isOpen, title, description, onConfirm, onCancel, confirmLabel = "Delete", isDestructive = true }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" 
        onClick={onCancel}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-sm rounded-[2rem] border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isDestructive ? "bg-red-50 dark:bg-red-950/30 text-red-600" : "bg-primary/10 text-primary"}`}>
            <AlertCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <button 
            onClick={onCancel}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row-reverse">
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all hover:opacity-90 ${
              isDestructive 
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                : "bg-primary text-white shadow-lg shadow-primary/20"
            }`}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
