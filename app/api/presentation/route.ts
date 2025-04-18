import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try{
    const session = await getServerSession()
    // @ts-expect-error some-type-error
    const { email } = session?.user
    
    const data = await req.json()
    console.log('data revied at backend is');
    console.log(data);
    
    
 const user = await prisma.user.findUnique({
    where:{email}
 })

 if(!user){
    return NextResponse.json({
        msg:"user not found!",
        success:false
    })
 }

     

    const createPresentation = await prisma.presentation.create({
        data:{
             userId:user?.id
        }
    })

    return NextResponse.json({
        msg:"presentation created success",
        id:createPresentation.id,
        success:true
    })
}catch(e){
console.log('error found');
return NextResponse.json({
    msg:'error found', e
})

}}