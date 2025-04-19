import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> { // Add explicit return type Promise<NextResponse>
  const { id } = params; // Use the destructured id

  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ success: false, msg: "Unauthorized" }, { status: 401 });
    }

    // Add check for email existence in session
    if (!session.user.email) {
        return NextResponse.json({ success: false, msg: "User email not found in session" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({
        msg: "User not found in database", // More specific message
        success: false
      }, { status: 404 }); // Use 404 for not found user
    }

    if (!id) {
      // This check might be redundant due to route structure but kept for safety
      return NextResponse.json({ success: false, msg: "Presentation ID missing" }, { status: 400 });
    }

    const presentation = await prisma.presentation.findUnique({
      where: {
        id, // Use the extracted id
        userId: user.id,
      },
      select: { id: true }
    });

    if (!presentation) {
      return NextResponse.json({ success: false, msg: "Presentation not found or not owned by user" }, {
        status: 404,
      });
    }

    await prisma.presentation.delete({
      where: {
        id, // Use the extracted id
      },
    });

    return NextResponse.json({ success: true, message: "Presentation deleted" });
  } catch (error) {
    console.error("[PRESENTATION_DELETE]", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}
