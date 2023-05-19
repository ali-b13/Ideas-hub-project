import { connectionDb } from "@uitls/database"
import Prompt from "@models/prompt"
import { NextResponse } from "next/server"
const handler=async(req:Request)=>{
  try {
     await connectionDb();
     const data=await Prompt.find({}).sort({createdAt:-1}).populate("creator");
     return NextResponse.json({message:"fetched successfully",data,status:200})
  } catch (error) {
    console.log(error,'error in fetching prompts')
    return NextResponse.json({message:"failed to fetch prompts",status:422})
  }
}

export {handler as GET}