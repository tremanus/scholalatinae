// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
};

const handler = NextAuth(authOptions);
export const GET = handler; // Handle GET requests
export const POST = handler; // Handle POST requests