"use client";

import { landlordJson } from "../../landlordAuth/landlordApiClient";

import { usePropertyStore } from "../propertyStore";

export async function getMyUnits({ forceRefresh = false } = {}) {
  const { units, hasLoadedUnits, setUnits } = usePropertyStore.getState();

  // Return cached data if available and refresh is not forced.
  if (hasLoadedUnits && !forceRefresh) {
    return units;
  }

  const data = await landlordJson("/properties/my-units", { method: "GET" });
  const result = Array.isArray(data) ? data : [];
  
  setUnits(result);
  return result;
}


