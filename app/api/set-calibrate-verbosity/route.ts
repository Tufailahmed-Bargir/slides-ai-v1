import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const data = await req.json()
    console.log('data revied at backend is');
    console.log(data);
    
    
    const {verbosity } = data;

    if(!verbosity){
        return NextResponse.json({
            msg:"input verbosity",
            success:false
        
        }, {status:201})
    }

    const inputSlideData = await prisma.slide.update({
        where:{
            id:'cm9huykuk0008ulaw81th6sjp'
        },
        data:{
             
            verbosity
        }
    })

    return NextResponse.json({
        msg:"  verbosity saved success",
        inputSlideData,
        success:true
    })
}