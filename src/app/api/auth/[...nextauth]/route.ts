// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Pre-hash passwords at startup to avoid async issues in demo users
const preHashedPasswords = {
  admin: "$2b$12$3exiRpi8AsDADYRjr.wrVemgdFr5cGYtRZLDjdbdahU9AyNU.uZrq", // password123
  user: "$2b$12$3exiRpi8AsDADYRjr.wrVemgdFr5cGYtRZLDjdbdahU9AyNU.uZrq", // password123
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Verify user credentials
        const user = await verifyUser(credentials.email, credentials.password);

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// Demo user verification function
async function verifyUser(email: string, password: string) {
  // Demo users with pre-hashed passwords
  const demoUsers = [
    {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      password: preHashedPasswords.admin,
    },
    {
      id: "2",
      email: "user@example.com",
      name: "Regular User",
      role: "user",
      password: preHashedPasswords.user,
    },
  ];

  const user = demoUsers.find((u) => u.email === email);
  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
  return null;
}
