import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const data = await req.json()
    console.log('data revied at backend is');
    console.log(data);
    
    
    const {tone, verbosity } = data;

    if(!tone || !verbosity){
        return NextResponse.json({
            msg:"input all the fields",
            success:false
        
        }, {status:201})
    }

    const inputSlideData = await prisma.slide.update({
        where:{
            id:'cm9huykuk0008ulaw81th6sjp'
        },
        data:{
            tone,
            verbosity
        }
    })

    return NextResponse.json({
        msg:"tone and verbosity saved success",
        inputSlideData,
        success:true
    })
}