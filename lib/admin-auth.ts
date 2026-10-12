import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "blueharbor_admin_demo";

function setting() {
  return {
    passcode: process.env.ADMIN_DEMO_PASSCODE || "DEMO2026",
    secret: process.env.ADMIN_SESSION_SECRET || "local-development-only-secret",
  };
}

export function adminSessionToken() {
  const { passcode, secret } = setting();
  return createHash("sha256").update(`${passcode}:${secret}:admin-demo`).digest("hex");
}

export function verifyAdminPasscode(input: string) {
  const expected = Buffer.from(setting().passcode);
  const received = Buffer.from(input);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function verifyAdminToken(input?: string) {
  if (!input) return false;
  const expected = Buffer.from(adminSessionToken());
  const received = Buffer.from(input);
  return expected.length === received.length && timingSafeEqual(expected, received);
}
