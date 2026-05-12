"use client";

import { landlordJson } from "../../landlordAuth/landlordApiClient";

export async function createRoomListing({ unitId, roomType, roomsAvailable, price, description, imageFile }) {
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

  if (imageFile) {
    // API expects field name `image` (multer upload.single('image')).
    form.set("image", imageFile);
  }

  return await landlordJson(`/properties/room/${unitId}`, {
    method: "POST",
    body: form,
  });
}


