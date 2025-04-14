import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const data = await req.json()
    console.log('data revied at backend is');
    console.log(data);
    
    
    const {instructions, content } = data;

    if(!instructions || !content){
        return NextResponse.json({
            msg:"input all the fields",
        
        }, {status:201})
    }

    const inputSlideData = await prisma.slide.create({
        data:{
            content_input:content,
            system_instruction:instructions
        }
    })

    return NextResponse.json({
        msg:"input and system instruction saved success",
        inputSlideData
    })
}