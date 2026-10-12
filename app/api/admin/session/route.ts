import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSessionToken, verifyAdminPasscode } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (typeof body.passcode !== "string" || !verifyAdminPasscode(body.passcode)) {
    return NextResponse.json({ message: "관리자 코드를 확인해 주세요." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminSessionToken(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 4 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
