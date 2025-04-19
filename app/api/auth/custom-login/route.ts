import prisma from "@/lib/db";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
// Removed: import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email }
    });

    // Removed: let token;

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({ // Assign the created user back to the user variable
        data: {
          email,
          pass: hashedPassword
        }
      });
      // Removed: JWT generation for new user
      // Return simple success message for creation
      return NextResponse.json({ ok: true, msg: "User created successfully!" }, { status: 201 });
    } else {
      // If user exists, compare password (assuming NextAuth doesn't handle this for custom route)
      const passwordMatch = await bcrypt.compare(password, user.pass!); // Add null assertion for user.pass
      if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
      // Removed: JWT generation for existing user
      // Return simple success message for login preparation
      return NextResponse.json({ ok: true, msg: "Login preparation successful!" }, { status: 200 });
    }

  } catch (error) {
    console.error("Custom login error:", error);
    // Ensure error is an instance of Error before accessing message
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ errors: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}