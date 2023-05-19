import {NextResponse } from 'next/server';
import { connectionDb } from '@uitls/database';
import Prompt from '@models/prompt';
import mongoose from 'mongoose';
export const POST =async (req: Request,{params}:any) => {
    const {tagName}=params

    try {
      await connectionDb();
   const posts= await Prompt.find().where({tag:"#".concat(tagName)}).populate("creator").sort({createdAt:-1})
    if(posts.length){
      console.log("fetched")
      return  NextResponse.json({message:"fetched",posts,status:200})
    }
    
    return  NextResponse.json({message:"not found",status:404})

    } catch (error) {
      console.log("error",error)
      return  NextResponse.json({message:"failed to create a prompt",status:422})

    }
};
 