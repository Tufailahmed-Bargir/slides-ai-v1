import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try{
    const data = await req.json()
    console.log('data revied at backend is');
    console.log(data);
    const {tone, id} = data;
    
     const presentation = await prisma.presentation.findFirst({
        where:{id}
     })

     if(!presentation){
        return NextResponse.json({
            msg:"cannot find the presentation",
            success:false
        })
     }
    if(!tone ||!id ){
        return NextResponse.json({
            msg:"input the tone",
            success:false
        
        }, {status:201})
    }

    const updatePresentation = await prisma.presentation.update({
        where:{id},
        data:{
            tone
             
        }
    })

    return NextResponse.json({
        msg:"tone saved success",
        
        success:true,
        id:updatePresentation.id
    })

}catch(e){
    return NextResponse.json({
        msg:"error found",e
    })
}
}