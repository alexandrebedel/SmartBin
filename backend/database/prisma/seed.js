import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Les variables d'environnement ADMIN_EMAIL ou ADMIN_PASSWORD ne sont pas définies.");
    return;
  }

  const hashPassword = await argon2.hash(password);
  const newUser = await prisma.admin.create({
    data: { email, password: hashPassword },
  });

  console.log("Utilisateur ajouté:", newUser);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
