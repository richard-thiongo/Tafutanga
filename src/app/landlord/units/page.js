"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, MapPin, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { getMyUnits } from "@/domain/propertyActions";
import { updateUnit } from "@/domain/propertyActions";
import { deleteUnit } from "@/domain/propertyActions";
import { usePropertyStore } from "@/domain/propertyStore";
import { ConfirmModal } from "@/ui/ConfirmModal";

export default function LandlordUnitsPage() {
  const units = usePropertyStore((s) => s.units);
  const setUnits = usePropertyStore((s) => s.setUnits);
  const updateUnitStore = usePropertyStore((s) => s.updateUnit);
  const deleteUnitStore = usePropertyStore((s) => s.deleteUnit);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUnit, setEditingUnit] = useState(null);
  const [deletingUnit, setDeletingUnit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isActive = true;
    async function load() {
      setError("");
      if (units.length === 0) setIsLoading(true);
      
      try {
        const data = await getMyUnits();
        if (!isActive) return;
        setUnits(data);
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load units");
      } finally {
        if (!isActive) return;
        setIsLoading(false);
      }
    }
    load();
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasUnits = units.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight">My units</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your buildings and compounds in Nairobi.
            </p>
          </div>
          <Link
            href="/landlord/units/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Register unit
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-border bg-card p-6 text-sm">{error}</div>
      ) : null}

      {isLoading && units.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading units…
        </div>
      ) : null}

      {!isLoading && !hasUnits ? (
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-sm text-muted-foreground">
            No units registered yet. Register your first unit to start adding room listings.
          </div>
          <div className="mt-4">
            <Link
              href="/landlord/units/new"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
            >
              Register unit
            </Link>
          </div>
        </div>
      ) : null}

      {hasUnits ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <UnitCard 
              key={unit.id} 
              unit={unit} 
              onEdit={() => setEditingUnit(unit)}
              onDelete={() => setDeletingUnit(unit)}
            />
          ))}
        </div>
      ) : null}

      <ConfirmModal
        isOpen={!!deletingUnit}
        title="Delete unit?"
        description={`This will permanently delete "${deletingUnit?.unit_name}" and all associated room listings. This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeletingUnit(null)}
        confirmLabel={isSubmitting ? "Deleting..." : "Delete"}
      />

      {editingUnit && (
        <EditUnitModal
          unit={editingUnit}
          isOpen={!!editingUnit}
          onClose={() => setEditingUnit(null)}
          onUpdate={handleUpdate}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );

  async function handleDelete() {
    if (!deletingUnit || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await deleteUnit(deletingUnit.id);
      deleteUnitStore(deletingUnit.id);
      setDeletingUnit(null);
    } catch (err) {
      setError(err?.message || "Failed to delete unit");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdate(unitId, data) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const updated = await updateUnit(unitId, data);
      updateUnitStore(updated);
      setEditingUnit(null);
    } catch (err) {
      setError(err?.message || "Failed to update unit");
    } finally {
      setIsSubmitting(false);
    }
  }
}

function UnitCard({ unit, onEdit, onDelete }) {
  const location = [unit?.place, unit?.county].filter(Boolean).join(", ");

  return (
    <div className="group relative rounded-3xl border border-border bg-card p-6 transition hover:border-primary/20">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted">
          <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate font-semibold">{unit.unit_name || "Unnamed Unit"}</div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit();
                }}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Edit Unit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="rounded-full p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                title="Delete Unit"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span className="truncate">{location || "Nairobi"}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              ID: {String(unit.id).slice(0, 8)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditUnitModal({ unit, isOpen, onClose, onUpdate, isSubmitting }) {
  const [unitName, setUnitName] = useState(unit.unit_name || "");
  const [county, setCounty] = useState(unit.county || "Nairobi");
  const [place, setPlace] = useState(unit.place || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-border bg-card p-5 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 scrollbar-hide">
        <h2 className="text-2xl font-bold tracking-tight">Edit unit</h2>
        <p className="mt-1 text-sm text-muted-foreground">Update your building's name and location.</p>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate(unit.id, { unitName, county, place });
          }}
          className="mt-8 grid gap-4"
        >
          <label className="grid gap-2 text-sm font-medium">
            Unit name
            <input
              autoFocus
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              placeholder="e.g. Skyline Apartments"
              className="rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              County
              <select
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="rounded-2xl border border-border bg-background px-4 py-3 outline-none"
              >
                <option value="Nairobi">Nairobi</option>
                <option value="Kiambu">Kiambu</option>
                <option value="Machakos">Machakos</option>
                <option value="Kajiado">Kajiado</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Area / Place
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="e.g. Roysambu"
                className="rounded-2xl border border-border bg-background px-4 py-3 outline-none"
                required
              />
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row-reverse">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-border bg-background px-6 py-3 font-bold text-muted-foreground hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
