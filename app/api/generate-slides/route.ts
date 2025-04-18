import prisma from "@/lib/db";
import { GoogleGenAI } from "@google/genai";

import { system_prompt } from "./system_prompt";
import { NextRequest, NextResponse } from "next/server";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('data received is', data);
    
    const { id } = data;

    const presentation = await prisma.presentation.findFirst({
      where: { id }
    });
 
    if (!presentation) {
      return NextResponse.json({
        msg: "presentation not found",
        success: false
      });
    }

    const { content_input, system_instruction, tone, verbosity } = presentation;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `create me slides on topic [${content_input}]
tone [${tone}], verbosity[level-${verbosity}] and follow this design guide bu the user [${system_instruction}] i need 3 SLIDES CONTENT

the verbosity level is defined as
VERBOSITY-LEVEL {
  LEVEL-1 :[70 TOKENS PER SLIDE]
  LEVEL-2 :[80 TOKEN PER SLIDE]
  LEVEL-3 :[90 TOKENS PER SLIDE]
}`,
      config: {
        systemInstruction: system_prompt,
        maxOutputTokens: 1000,
        temperature: 0.5,
        responseMimeType: "application/json"
      },
    });
    
    console.log('hello from gemini');
    console.log(response.text);
 
    const updatePresentation = await prisma.presentation.update({
      where: { id },
      data: {
        generated_content: response.text
      }
    });

    return NextResponse.json({
      msg: "content generated success!",
      success: true,
      updatePresentation,
      id: updatePresentation.id
    });
  } catch (e) {
    console.error("Error generating slides:", e);
    return NextResponse.json(
      {
        msg: "error found!",
        error: e instanceof Error ? e.message : "Unknown error",
        success: false,
      },
      { status: 500 }
    );
  }
}
