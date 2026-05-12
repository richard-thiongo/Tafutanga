"use client";

import { landlordJson } from "../../landlordAuth/landlordApiClient";

export async function deleteUnit(unitId) {
  if (!unitId) throw new Error("Unit ID is required");

  return await landlordJson(`/properties/unit/${unitId}`, {
    method: "DELETE",
  });
}
