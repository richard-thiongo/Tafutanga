"use client";

import { landlordJson } from "../../landlordAuth/landlordApiClient";

export async function updateUnit(unitId, { county, place, unitName }) {
  if (!unitId) throw new Error("Unit ID is required");
  if (!county?.trim() || !place?.trim() || !unitName?.trim()) {
    throw new Error("County, place, and unit name are required");
  }

  return await landlordJson(`/properties/unit/${unitId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      county: county.trim(),
      place: place.trim(),
      unitName: unitName.trim(),
    }),
  });
}
