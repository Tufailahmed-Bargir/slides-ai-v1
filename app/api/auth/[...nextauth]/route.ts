import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";  
import bcrypt from 'bcrypt'
import prisma from "@/lib/db";
 

const handler = NextAuth({
  debug:true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      // Add authorization checks to prevent failed login attempts with empty credentials
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // Add CredentialsProvider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
   
        try {
        if (!credentials?.email || !credentials?.password) {
          
          throw new Error("Email and password are required.");
        }

           const userExists = await prisma.user.findUnique({
            where:{email:credentials?.email}
           })
          if (!userExists) {
            console.log(`Login attempt failed: User ${credentials.email} not found.`);
            throw new Error("No user found with this email. Please sign up.");
          }

         
         
          const verifyPassword = await bcrypt.compare(credentials.password,userExists.pass, )

          if(!verifyPassword){
            console.log(`Login attempt failed: invalid password`);
            throw new Error("Please provide the correct pasword");
          }

        

         
          return {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            
          };

        } catch (error) {
          console.error("Error in authorize function:", error);
           
          if (error instanceof Error) {
            throw new Error(error.message || "Authentication failed");
          }
          throw new Error("An unknown error occurred during authorization.");
        }
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

      // Handle Credentials Sign in - User MUST exist now
      if (account?.provider === "credentials") {
        // The authorize function already validated the user and password
        // We just need to ensure a user object was returned (authorize didn't throw/return null)
        return !!user; // Allow credentials sign-in only if authorize returned a user
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
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // Persist the user id from the token to the session
      if (token.id && session.user) {
        session.user.id = token.id as string;
        // Add any other properties from the token to the session user
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
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
