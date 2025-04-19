// import prisma from "@/lib/db";
import prisma, { getUserByEmail } from "@/lib/db"; // Import getUserByEmail
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // Import CredentialsProvider
import bcrypt from "bcrypt"; // Import bcrypt

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // Add CredentialsProvider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Or throw an error
        }

        const user = await getUserByEmail(credentials.email);
        if (!user) {
          // User not found by the custom-login check, should ideally not happen if frontend calls custom-login first
          // but handle defensively.
          // Alternatively, you could throw an error here.
          return null;
        }

        // Ensure user has a password (they might have signed up via Google)
        if (!user.pass) { // Use user.pass based on schema
           throw new Error("Please log in using the method you originally signed up with.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.pass); // Use user.pass
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return only necessary user fields for the session/token
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT strategy
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure secret is set in .env
  callbacks: {
    async signIn(params) {
      // This callback handles both Google and Credentials sign-in attempts AFTER authorize runs
      const { user, account } = params; // Remove unused 'profile'

      // Handle Google Sign in - Create user if not exists
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              // Note: No password for Google sign-ups
            },
          });
        }
        return true; // Allow Google sign-in
      }

      // Handle Credentials Sign in - User should already exist or be created by custom-login
      if (account?.provider === "credentials") {
        // The authorize function already validated the user and password
        return true; // Allow credentials sign-in
      }

      // Default deny if none of the above conditions are met
      return false;
    },
    // Add jwt and session callbacks if you need to customize the token/session
    async jwt({ token, user }) { // Remove unused 'account'
      // Persist the user id and other details from the authorize function to the token
      if (user) {
        token.id = user.id;
        // Add any other user properties you want in the token
      }
      return token;
    },
    async session({ session, token }) {
      // Persist the user id from the token to the session
      if (token.id && session.user) {
        session.user.id = token.id as string;
        // Add any other properties from the token to the session user
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Redirect users to /login if they need to sign in
    // error: '/auth/error', // Optional: Custom error page
  }
});

export { handler as GET, handler as POST };
