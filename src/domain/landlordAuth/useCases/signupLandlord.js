"use client";

import { landlordJson } from "../landlordApiClient";
import { useLandlordAuthStore } from "../landlordAuthStore";

export async function signupLandlord({ fullName, phoneNumber, email, password }) {
  if (!fullName?.trim() || !phoneNumber?.trim() || !email?.trim() || !password) {
    // Enforce backend required fields before request.
    throw new Error("Full name, phone number, email, and password are required");
  }

  const tokens = await landlordJson("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      password,
    }),
  });

  useLandlordAuthStore.getState().setTokens(tokens);
  return tokens;
}

