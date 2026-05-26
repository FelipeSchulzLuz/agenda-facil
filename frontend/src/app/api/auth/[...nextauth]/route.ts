import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // Mock for demo/MVP without keys
    CredentialsProvider({
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "demo@example.com" },
      },
      async authorize(credentials) {
        if (credentials?.email) {
          return { id: "1", name: "User Demo", email: credentials.email };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
