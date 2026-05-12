"use client";

import { landlordFetch } from "../../landlordAuth/landlordApiClient";
import { useToastStore } from "@/ui/toast/toastStore";

export async function deleteRoomListing({ roomId }) {
  if (!roomId) throw new Error("Room is required");

  const response = await landlordFetch(`/properties/room/${roomId}`, { method: "DELETE" });
  if (!response.ok) {
    // Do not surface raw backend text to users; keep response generic and safe.
    const message =
      response.status === 401
        ? "Your session has expired. Please sign in again."
        : response.status === 403
          ? "You are not allowed to delete this listing."
          : response.status === 404
            ? "Listing not found."
            : response.status >= 500
              ? "Server error. Please try again in a moment."
              : "Unable to delete listing. Please try again.";
    useToastStore.getState().pushToast({
      type: "error",
      message,
    });
    throw new Error(message);
  }

  useToastStore.getState().pushToast({
    type: "success",
    message: "Listing deleted successfully.",
  });
}

