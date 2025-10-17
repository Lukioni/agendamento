import { db } from "../db/client";
import { users } from "../db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email e senha obrigatórios",
    });
  }

  await db.insert(users).values({
    name: body.name ?? "Usuário",
    email: body.email,
    password: body.password, // depois tu troca por bcrypt.hash(body.password, 10)
    role: body.role ?? "user",
  });

  return { ok: true };
});
