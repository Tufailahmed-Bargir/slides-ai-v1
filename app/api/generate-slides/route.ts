import prisma from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
 
import { system_prompt } from "./system_prompt";
import { NextResponse } from "next/server";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type InputType = {
    content_input:string,
    tone:string,
    verbosity:number
}
async function generateWithGemini({content_input, tone, verbosity}:InputType) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `create me slides on topic [${content_input}]
tone [${tone}], verbosity[level-${verbosity}]  i need 3 SLIDES CONTENT

the verbosity level is defined as
VERBOSITY-LEVEL {

LEVEL-1 :[70 TOKENS PER SLIDE]
LEVEL-2 :[80 TOKEN PER SLIDE]
LEVEL-3 :[90 TOKENS PER SLIDE]

}

 

`,
    config: {
      systemInstruction: system_prompt,
      maxOutputTokens: 1000,
      temperature: 0.5,
     responseMimeType:"application/json"
    },
  });
  console.log('hello form gemini');
  
  console.log(response.text);
  return response.text
}
export async function POST(){
     try{
    const slide = await prisma.slide.findFirst({
        where:{
            id:"cm9huykuk0008ulaw81th6sjp"
        }
    })
    console.log('slide data is', slide);
    // @ts-expect-error some-type-error
    const {content_input,tone, verbosity}:InputType = slide;
    

    const response = await generateWithGemini({content_input,tone, verbosity})

    console.log('response from gemini', response);
    return NextResponse.json({
        msg:"content generated success!",
        success:true,
        response
    })
}catch(e){
 return NextResponse.json({
    msg:"error found!",
    e
 })
}

  
    
    
     

    

   

   
}