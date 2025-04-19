import prisma  from "@/lib/db";
 
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

     const user = await prisma.user.findUnique({
        where:{email}
     })

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10)
         await prisma.user.create({
        data:{
            email,
            pass:hashedPassword
        }
       })
    }
    // If user exists, we don't need to do anything here, 
    // NextAuth's authorize function will handle the password check.

    return NextResponse.json({ ok: true, msg:"user created success!",  }, { status: 200 });
  } catch (error) {
    console.error("Custom login error:", error);
    return NextResponse.json({ errors: 'Internal Server Error', error }, { status: 500 });
  }
}