import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// In-memory rate limiter (works for single-instance; upgrade to Redis/Upstash for multi-instance)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX = 5; // max 5 enquiry submissions per minute per IP

function getRateLimitKey(ip: string, path: string) {
  return `${ip}:${path}`;
}

function checkRateLimit(ip: string, path: string): boolean {
  const key = getRateLimitKey(ip, path);
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false; // blocked
  }

  entry.count++;
  return true; // allowed
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit the enquiry API route
  if (pathname.startsWith("/api/enquiry")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const allowed = checkRateLimit(ip, pathname);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/api/enquiry/:path*", "/admin/:path*", "/dashboard/:path*"],
};
