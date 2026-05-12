"use client";

import { landlordJson } from "../../landlordAuth/landlordApiClient";

import { usePropertyStore } from "../propertyStore";

export async function getMyListings({ forceRefresh = false } = {}) {
  const { listings, hasLoadedListings, setListings } = usePropertyStore.getState();

  // Return cached data if available and refresh is not forced.
  if (hasLoadedListings && !forceRefresh) {
    return listings;
  }

  const data = await landlordJson("/properties/my-listings", { method: "GET" });
  const result = Array.isArray(data) ? data : [];
  
  setListings(result);
  return result;
}


