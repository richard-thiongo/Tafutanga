"use client";

import { landlordJson } from "../../landlordAuth/landlordApiClient";

export async function createUnit({ county, place, unitName }) {
  if (!county?.trim() || !place?.trim() || !unitName?.trim()) {
    // Units require a location context for Nairobi house-hunting accuracy.
    throw new Error("County, place, and unit name are required");
  }

  return await landlordJson("/properties/unit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      county: county.trim(),
      place: place.trim(),
      unitName: unitName.trim(),
    }),
  });
}

