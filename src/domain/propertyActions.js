import { landlordJson, landlordFetch } from "@/domain/authClient";
import { useToastStore } from "@/ui/toastStore";
import { usePropertyStore } from "./propertyStore";

export async function createRoomListing({ unitId, roomType, roomsAvailable, price, description, imageFile, imageUrl }) {
  if (!unitId) throw new Error("Unit is required");
  if (!roomType?.trim()) throw new Error("Room type is required");

  const roomsAvailableNumber = Number(roomsAvailable);
  const priceNumber = Number(price);

  if (!Number.isFinite(roomsAvailableNumber) || roomsAvailableNumber < 0) {
    // Backend requires integer >= 0; enforce the invariant on the client too.
    throw new Error("Rooms available must be a number greater than or equal to 0");
  }
  if (!Number.isFinite(priceNumber) || priceNumber < 0) {
    throw new Error("Price must be a number greater than or equal to 0");
  }

  const form = new FormData();
  form.set("roomType", roomType.trim());
  form.set("roomsAvailable", String(Math.trunc(roomsAvailableNumber)));
  form.set("price", String(priceNumber));
  
  if (description?.trim()) {
    form.set("description", description.trim());
  }

  if (imageUrl?.trim()) {
    form.set("imageUrl", imageUrl.trim());
  }

  if (imageFile) {
    // API expects field name `image` (multer upload.single('image')).
    form.set("image", imageFile);
  }

  return await landlordJson(`/properties/room/${unitId}`, {
    method: "POST",
    body: form,
  });
}






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





export async function deleteUnit(unitId) {
  if (!unitId) throw new Error("Unit ID is required");

  return await landlordJson(`/properties/unit/${unitId}`, {
    method: "DELETE",
  });
}





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






export async function updateRoomListing({ roomId, roomType, roomsAvailable, price, description, imageFile, imageUrl }) {
  if (!roomId) throw new Error("Room is required");
  if (!roomType?.trim()) throw new Error("Room type is required");

  const roomsAvailableNumber = Number(roomsAvailable);
  const priceNumber = Number(price);

  if (!Number.isFinite(roomsAvailableNumber) || roomsAvailableNumber < 0) {
    throw new Error("Rooms available must be a number greater than or equal to 0");
  }
  if (!Number.isFinite(priceNumber) || priceNumber < 0) {
    throw new Error("Price must be a number greater than or equal to 0");
  }

  const form = new FormData();
  form.set("roomType", roomType.trim());
  form.set("roomsAvailable", String(Math.trunc(roomsAvailableNumber)));
  form.set("price", String(priceNumber));
  
  if (description?.trim()) {
    form.set("description", description.trim());
  }

  if (imageUrl !== undefined) {
    form.set("imageUrl", imageUrl.trim());
  }

  if (imageFile) {
    form.set("image", imageFile);
  }

  return await landlordJson(`/properties/room/${roomId}`, {
    method: "PUT",
    body: form,
  });
}






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

