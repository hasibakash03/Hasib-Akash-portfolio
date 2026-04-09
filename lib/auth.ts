import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Env-var login (always works, no DB needed)
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return { id: "admin", email: adminEmail!, name: "Admin", role: "admin" };
        }

        // DB login (only if DATABASE_URL set)
        if (process.env.DATABASE_URL) {
          try {
            const { db } = await import("@/db");
            const { users } = await import("@/db/schema");
            const { eq } = await import("drizzle-orm");
            const bcrypt = await import("bcryptjs");
            const [user] = await db.select().from(users).where(eq(users.email, credentials.email as string)).limit(1);
            if (!user) return null;
            const valid = await bcrypt.compare(credentials.password as string, user.passwordHash);
            if (!valid) return null;
            return { id: user.id, email: user.email, name: "Admin", role: user.role };
          } catch { return null; }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    async session({ session, token }) {
      if (token) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-change-in-production",
  session: { strategy: "jwt" },
});
