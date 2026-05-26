import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const TRUSTED_SINGLE_IP_HEADERS = [
  "cf-connecting-ip",
  "true-client-ip",
  "x-vercel-forwarded-for",
  "x-real-ip",
] as const;

function getRateLimitKey(ip: string, path: string) {
  return `${ip}:${path}`;
}

function checkRateLimit(ip: string, path: string): boolean {
  const key = getRateLimitKey(ip, path);
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

function parseTrustedProxyHops() {
  const configuredHops = Number.parseInt(process.env.TRUSTED_PROXY_HOPS ?? "1", 10);

  if (!Number.isFinite(configuredHops) || configuredHops < 1) {
    return 1;
  }

  return Math.min(configuredHops, 5);
}

function normalizeIpCandidate(value: string | null) {
  if (!value) {
    return null;
  }

  let candidate = value.trim().toLowerCase();

  if (!candidate || candidate.includes(",") || candidate.length > 64) {
    return null;
  }

  if (candidate.startsWith("[")) {
    const closingBracketIndex = candidate.indexOf("]");
    if (closingBracketIndex === -1) {
      return null;
    }
    candidate = candidate.slice(1, closingBracketIndex);
  } else {
    const colonCount = (candidate.match(/:/g) ?? []).length;
    if (colonCount === 1 && candidate.includes(".")) {
      candidate = candidate.split(":")[0];
    }
  }

  const ipv4Parts = candidate.split(".");
  const isIpv4 =
    ipv4Parts.length === 4 &&
    ipv4Parts.every((part) => {
      if (!/^\d{1,3}$/.test(part)) {
        return false;
      }
      const value = Number.parseInt(part, 10);
      return value >= 0 && value <= 255;
    });

  const isLikelyIpv6 =
    candidate.includes(":") &&
    candidate.length <= 45 &&
    /^[a-f0-9:.]+$/.test(candidate);

  return isIpv4 || isLikelyIpv6 ? candidate : null;
}

function getHeaderIp(request: NextRequest, headerName: string) {
  return normalizeIpCandidate(request.headers.get(headerName));
}

function getForwardedForIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!forwardedFor) {
    return null;
  }

  const forwardedIps = forwardedFor
    .split(",")
    .map((value) => normalizeIpCandidate(value))
    .filter((value): value is string => Boolean(value));

  if (forwardedIps.length === 0) {
    return null;
  }

  const trustedProxyHops = parseTrustedProxyHops();
  const trustedClientIndex = forwardedIps.length - trustedProxyHops;

  return forwardedIps[Math.max(0, trustedClientIndex)] ?? null;
}

function normalizeFallbackPart(value: string | null) {
  return (value ?? "unknown").trim().toLowerCase().replace(/[^a-z0-9._:-]/g, "_").slice(0, 96);
}

function getRateLimitIdentity(request: NextRequest) {
  const configuredHeader = process.env.TRUSTED_CLIENT_IP_HEADER?.toLowerCase();

  if (configuredHeader) {
    const configuredIp = getHeaderIp(request, configuredHeader);

    if (configuredIp) {
      return configuredIp;
    }
  }

  for (const headerName of TRUSTED_SINGLE_IP_HEADERS) {
    const ip = getHeaderIp(request, headerName);

    if (ip) {
      return ip;
    }
  }

  return (
    getForwardedForIp(request) ??
    `fallback:${normalizeFallbackPart(request.headers.get("host"))}:${normalizeFallbackPart(
      request.headers.get("user-agent")
    )}`
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/enquiry") || pathname.startsWith("/api/enquire")) {
    const ip = getRateLimitIdentity(request);

    if (!checkRateLimit(ip, pathname)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/api/enquiry/:path*",
    "/api/enquire/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/pending-approval",
    "/student-login",
  ],
};
