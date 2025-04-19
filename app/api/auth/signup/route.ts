import { NextResponse } from 'next/server';
 
import { hashPassword } from '@/lib/hash-utils';
import prisma from '@/lib/db';
 

 

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, email, password}= data;

     

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 }); // 409 Conflict
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

     
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        pass: hashedPassword,
        
      },
    });

  

    return NextResponse.json({ message: "User created successfully",  }, { status: 201 }); // 201 Created

  } catch (error) {
    console.error("Signup Error:", error);
    // Generic error for security
    return NextResponse.json({ message: "An error occurred during sign up." }, { status: 500 });
  }
}
