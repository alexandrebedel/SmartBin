import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.SECRET_KEY);

export async function encrypt(payload: any, expires: number) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(expires))
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  const newExpiration = new Date(Date.now() + 24 * 60 * 1000);
  parsed.expires = newExpiration;

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed, newExpiration.getTime()),
    httpOnly: true,
    expires: newExpiration,
  });
  return res;
}