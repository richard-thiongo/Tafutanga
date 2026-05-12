"use client";

import { useLandlordAuthStore } from "./landlordAuthStore";
import { useToastStore } from "@/ui/toast/toastStore";

function getApiBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Default supports local dev of `tafutanga-api` (Express).
  return raw?.replace(/\/$/, "") || "http://localhost:5000/api";
}

async function readJsonSafely(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

async function refreshTokensOrThrow() {
  const { refreshToken } = useLandlordAuthStore.getState();
  if (!refreshToken) {
    // Without a refresh token, we must force re-auth.
    throw new Error("Missing refresh token");
  }

  const response = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  });

  const data = await readJsonSafely(response);
  if (!response.ok) {
    throw new Error(data?.message || "Refresh failed");
  }

  if (!data?.accessToken || !data?.refreshToken) {
    // We need both tokens to keep the session consistent.
    throw new Error("Refresh response missing tokens");
  }

  useLandlordAuthStore.getState().setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return data.accessToken;
}

function withAuthHeader(init, accessToken) {
  const headers = new Headers(init?.headers || undefined);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  return { ...init, headers };
}

function getSafeSuccessMessage(method) {
  if (method === "POST") return "Saved successfully.";
  if (method === "PUT" || method === "PATCH") return "Updated successfully.";
  if (method === "DELETE") return "Deleted successfully.";
  return "Request completed successfully.";
}

function getSafeErrorMessage(status) {
  if (status === 400) return "Your input is invalid. Please review and try again.";
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You are not allowed to perform this action.";
  if (status === 404) return "The requested item was not found.";
  if (status === 409) return "This action conflicts with existing data.";
  if (status === 413) return "The uploaded file is too large.";
  if (status === 429) return "Too many requests. Please try again shortly.";
  if (status >= 500) return "Server error. Please try again in a moment.";
  return "Request failed. Please try again.";
}

export async function landlordFetch(path, init) {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

  const { accessToken } = useLandlordAuthStore.getState();
  const firstResponse = await fetch(url, withAuthHeader(init, accessToken));

  if (firstResponse.status !== 401) return firstResponse;

  // Retry once after refresh to prevent infinite loops.
  try {
    const nextAccessToken = await refreshTokensOrThrow();
    return await fetch(url, withAuthHeader(init, nextAccessToken));
  } catch {
    useLandlordAuthStore.getState().clear();
    return firstResponse;
  }
}

export async function landlordJson(path, init) {
  const response = await landlordFetch(path, init);
  const data = await readJsonSafely(response);
  const method = (init?.method || "GET").toUpperCase();

  if (!response.ok) {
    const safeMessage = getSafeErrorMessage(response.status);
    useToastStore.getState().pushToast({
      type: "error",
      message: safeMessage,
    });
    const error = new Error(safeMessage);
    error.status = response.status;
    // Keep raw payload for diagnostics, but never expose directly in UI.
    error.data = data;
    throw error;
  }

  useToastStore.getState().pushToast({
    type: "success",
    message: getSafeSuccessMessage(method),
  });
  return data;
}

