"use client";

function getApiBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
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

export async function publicJson(path, init) {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, init);
  const data = await readJsonSafely(response);

  if (!response.ok) {
    const error = new Error(data?.message || "Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
