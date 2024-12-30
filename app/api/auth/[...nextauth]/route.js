import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        session.user.id = token.sub; // Add user ID to session
        return session;
      },
    },
  };
  
const handler = NextAuth(authOptions);

export const GET = handler; // Handle GET requests
export const POST = handler; // Handle POST requests
  