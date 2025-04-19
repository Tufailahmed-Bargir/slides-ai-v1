import prisma from "@/lib/db";
import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth"; // update this path as per your setup

export const dynamic = 'force-dynamic'; // Mark the route as dynamic

export async function GET( ) {
  try {
    const session = await getServerSession( );

    if (!session?.user?.email) {
      return NextResponse.json(
        { msg: "Unauthorized: No session found" },
        { status: 401 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    // Get presentations
    const presentation = await prisma.presentation.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json({
      msg: "All presentations fetched successfully!",
      presentation,
    });
  } catch (error) {
    console.error("Error fetching presentations:", error);
    return NextResponse.json(
      { msg: "Something went wrong!", error: (error)?.message || error },
      { status: 500 }
    );
  }
}
