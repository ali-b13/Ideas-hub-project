import Prompt from "@models/prompt"
import { connectionDb } from "@uitls/database"
import { NextResponse } from "next/server"

const handler =async(req:Request,{params}:any)=>{
    try {
       
        await connectionDb();
        const posts=await Prompt.find().where({creator:params.id}).populate("creator").sort({createdAt:-1})
        return NextResponse.json({message:"data is fetched successfully",posts,status:200})
    } catch (error) {
      console.log(error,'error message')
      return NextResponse.json({message:"failed to fetch posts of the given user",status:422})
    }
}

export {handler as GET}