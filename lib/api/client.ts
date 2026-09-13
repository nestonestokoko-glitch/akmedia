"use client";

// ------------------------------------------------------------
// AK Media India — Centralized typed API client
// Brief requirement #22: no raw fetch() scattered in components.
// All request functions are here, typed against lib/api/types.ts.
//
// Base URL: NEXT_PUBLIC_API_BASE_URL (default http://localhost:3000/api
// per the brief). Falls back to a same-origin "/api" so dev and prod
// both work without extra config.
// ------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ApiResult,
  Brand,
  BrandQuoteInput,
  BrandQuoteResponse,
  Campaign,
  Creator,
  CreatorApplicationInput,
  CreatorApplicationResponse,
  HealthResponse,
  PostErrorResponse,
  Stats,
} from "./types";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // non-JSON error body — keep the status message
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}

// ---------- Typed endpoints ----------

export const api = {
  health: () => request<HealthResponse>("/health"),
  stats: () => request<ApiResult<Stats>>("/stats").then(unwrapError),
  creators: (opts?: { limit?: number; category?: string }) => {
    const q = new URLSearchParams();
    if (opts?.limit) q.set("limit", String(opts.limit));
    if (opts?.category) q.set("category", opts.category);
    return request<ApiResult<Creator[]>>(`/creators${q.size ? `?${q}` : ""}`).then(unwrapError);
  },
  brands: (opts?: { limit?: number }) => {
    const q = new URLSearchParams();
    if (opts?.limit) q.set("limit", String(opts.limit));
    return request<ApiResult<Brand[]>>(`/brands${q.size ? `?${q}` : ""}`).then(unwrapError);
  },
  campaigns: (opts?: { limit?: number }) => {
    const q = new URLSearchParams();
    if (opts?.limit) q.set("limit", String(opts.limit));
    return request<ApiResult<Campaign[]>>(`/campaigns${q.size ? `?${q}` : ""}`).then(unwrapError);
  },

  submitBrandQuote: (input: BrandQuoteInput) =>
    request<BrandQuoteResponse | PostErrorResponse>("/brands/quote", {
      method: "POST",
      body: JSON.stringify(input),
    }).then(assertOk),

  submitCreatorApplication: (input: CreatorApplicationInput) =>
    request<CreatorApplicationResponse | PostErrorResponse>("/creators/apply", {
      method: "POST",
      body: JSON.stringify(input),
    }).then(assertOk),
};

// When the envelope says success:false we throw so callers always get a
// typed success result or an Error — never an unchecked failure object.
function unwrapError<T>(r: ApiResult<T>): T {
  if (!r.success) throw new Error("API responded with an error");
  return r.data;
}

function assertOk<T extends { success: boolean; message?: string }>(r: T): T {
  if (!r.success) throw new Error(r.message ?? "Request failed");
  return r;
}

// ---------- State helper (loading / error / data / retry) ----------
export type ApiState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: string };

export function useApi<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<ApiState<T>>({ status: "loading", data: null, error: null });
  const [attempt, setAttempt] = useState(0);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });
    loaderRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ status: "success", data, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setState({ status: "error", data: null, error: err instanceof Error ? err.message : "Request failed" });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, ...deps]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}

export type { ApiResult }; // re-export for convenience