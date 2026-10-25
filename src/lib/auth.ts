import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

/** The cookie value a logged-in admin session should carry. */
export function getAdminSessionToken(): string {
  return crypto.createHmac("sha256", getSecret()).update("admin-authenticated").digest("hex");
}

export function isValidAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  return timingSafeEqualStrings(password, expected);
}

export function isValidAdminSessionCookie(value: string | undefined | null): boolean {
  if (!value) return false;
  return timingSafeEqualStrings(value, getAdminSessionToken());
}
