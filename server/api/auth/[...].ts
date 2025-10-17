// /server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~~/server/db/client";
import { users } from "~~/server/db/schema";
import { eq } from "drizzle-orm";
// import bcrypt from 'bcryptjs' // quando for usar hash

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  session: { strategy: "jwt" }, // importante p/ JWT no cookie
  jwt: { maxAge: 60 * 15 }, // 15 min; Auth.js faz rotation automática
  providers: [
    // @ts-expect-error SSR quirk
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const email = String(credentials?.email ?? "").trim();
        const password = String(credentials?.password ?? "");

        if (!email || !password) return null;

        // busca usuário
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        if (!user) return null;

        // valida senha
        // quando usar hash:
        // const ok = await bcrypt.compare(password, user.passwordHash)
        // if (!ok) return null
        if (user.password !== password) return null;

        // retorna o payload que vira token/session
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role as "admin" | "barber" | "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role ?? "user";
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore - estendendo a sessão com role
      session.user.role = (token as any).role ?? "user";
      return session;
    },
  },
  pages: {
    signIn: "/login", // opcional: tua página de login
  },
});
