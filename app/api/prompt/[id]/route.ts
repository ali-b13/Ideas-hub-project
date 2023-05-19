import {NextResponse } from 'next/server';
import { connectionDb } from '@uitls/database';
import Prompt from '@models/prompt';
import mongoose from 'mongoose';
export const GET =async (req: Request,{params}:any) => {
    const {id}=params
    console.log("IDDDDDD" ,id)
    try {
      await connectionDb();
   const prompt= await Prompt.findById(id)
    if(prompt){
      console.log("fetched")
      return  NextResponse.json({message:"fetched",prompt,status:200})
    }
    
    return  NextResponse.json({message:"not found",status:404})

    } catch (error) {
      console.log("error",error)
      return  NextResponse.json({message:"failed to create a prompt",status:422})

    }
};
 
// PATCH
export const PATCH =async (req: Request,{params}:any) => {
  const {prompt,tag}=await req.json()
  try {
    await connectionDb();
 const post= await Prompt.findById(params.id)
  if(post){
     post.prompt=prompt;
     post.tag=tag
     await post.save()
    return  NextResponse.json({message:"post updated",post,status:200})
  }
  
  return  NextResponse.json({message:"not found",status:404})

  } catch (error) {
    console.log("error",error)
    return  NextResponse.json({message:"failed to update a prompt",status:422})

  }
};

//Delete 
export const DELETE =async (req: Request,{params}:any) => {
  console.log("id will be",params)
  try {
    await connectionDb();
 const prompt= await Prompt.findByIdAndDelete(params.id)
  
  if(prompt){
    return  NextResponse.json({message:"deleted",prompt,status:200})
  }
  
  return  NextResponse.json({message:"not found",status:404})

  } catch (error) {
    console.log("error",error)
    return  NextResponse.json({message:"failed to delete a prompt",status:422})

  }
};