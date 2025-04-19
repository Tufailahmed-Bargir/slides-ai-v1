import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("data revied at backend is");
  console.log(data);

  const {
    data: { content, instructions },
    id,
    slidesCount
  } = data;

  if (!instructions || !content || !id) {
    return NextResponse.json(
      {
        msg: "input all the fields",
        success: false,
      },
      { status: 201 },
    );
  }

  const presentation = await prisma.presentation.findFirst({
    where: { id },
  });

  if (!presentation) {
    return NextResponse.json({
      msg: "presentation not found",
      success: false,
    });
  }
  const updatePresentation = await prisma.presentation.update({
    where: { id },
    data: {
      content_input: content,
      system_instruction: instructions,
      no_of_slides:slidesCount
    },
  });

  return NextResponse.json({
    msg: "input and system instruction saved success",

    success: true,
    id: updatePresentation.id,
  });
}
