import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("data revied at backend is");
  console.log(data);

  const { verbosity, id } = data;

  if (!verbosity || !id) {
    return NextResponse.json(
      {
        msg: "input verbosity and id",
        success: false,
      },
      { status: 201 },
    );
  }

  const updatePresentation = await prisma.presentation.update({
    where: {
      id,
    },
    data: {
      verbosity,
    },
  });

  return NextResponse.json({
    msg: "verbosity saved success",

    success: true,
    id: updatePresentation.id,
  });
}
