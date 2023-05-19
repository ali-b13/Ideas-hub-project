import {NextResponse } from 'next/server';
import { connectionDb } from '@uitls/database';
import Prompt from '@models/prompt';
const handler =async (req: Request) => {
   const {prompt,tag,userId}=await req.json()
    try {
      await connectionDb();
   const newPrompt= await Prompt.create({prompt:prompt,tag:tag,creator:userId})
    await newPrompt.save();
    console.log(newPrompt,'new prompt')
    return  NextResponse.json({message:"created",newPrompt:JSON.stringify(newPrompt),status:201})

    } catch (error) {
      console.log("error",error)
      return  NextResponse.json({message:"failed to create a prompt",status:422})

    }
};
 
export  {handler as POST}