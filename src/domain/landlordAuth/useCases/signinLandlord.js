"use client";

import { landlordJson } from "../landlordApiClient";
import { useLandlordAuthStore } from "../landlordAuthStore";

export async function signinLandlord({ email, password }) {
  if (!email?.trim() || !password) {
    // Fail fast to avoid sending empty credentials to the API.
    throw new Error("Email and password are required");
  }

  const tokens = await landlordJson("/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
  });

  useLandlordAuthStore.getState().setTokens(tokens);
  return tokens;
}

