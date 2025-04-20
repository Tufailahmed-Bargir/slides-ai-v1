import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// Import authOptions from the NextAuth handler file
// import { authOptions } from "../auth/[...nextauth]/route"; 

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Pass authOptions to getServerSession again
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { msg: "Unauthorized: No session found" },
        { status: 401 }
      );
    } 

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    const presentations = await prisma.presentation.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json({
      msg: "All presentations fetched successfully!",
      presentations,
    });
  } catch (error: any) {
    console.error("Error fetching presentations:", error);
    return NextResponse.json(
      { msg: "Something went wrong!", error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
