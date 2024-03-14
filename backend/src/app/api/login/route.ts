import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import * as argon2 from "argon2";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.admin.findFirst({
      where: {
        email
      }
    });

    let comparedPassword = null;
    if (user?.password) comparedPassword = await argon2.verify(user.password, password);

    if (user && comparedPassword) {
      const userSafe = { email: user.email };
      const expires = Date.now() + (24 * 60 * 60 * 1000);
      const session = await encrypt({ userSafe, expires }, expires);

      cookies().set('session', session, { expires, httpOnly: true, path: '/' });
      return Response.json({ userSafe });
    } else {
      return Response.json({ message: "Mauvais identifiants" }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}