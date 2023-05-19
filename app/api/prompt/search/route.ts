import { connectionDb } from "@uitls/database"
import Prompt from "@models/prompt"
import { NextResponse } from "next/server"
import User from "@models/user"
import mongoose, { ObjectId } from "mongoose"
interface USER{
  _id:ObjectId,
  username:string,
  email:string,
  image:string,
  __v:number
}
export const POST =async(req:Request)=>{
  const {type,searchText}=await req.json()

  try {
   await  connectionDb();
   if(type=="#"){
    const postsOFTag=await Prompt.find().where({tag:{ $regex: new RegExp(searchText, 'i')}}).populate("creator").sort({createdAt:-1});
 
    return NextResponse.json({message:"fetched the posts of the tag",posts:postsOFTag,status:200}) 
   }else if(type=="@"){
     // handle username search
   
     const user:USER=await User.findOne().where({username:{ $regex: new RegExp(searchText.slice(1), 'i')}});
      if(user){
      const  postsOfUser=await Prompt.find({creator:user._id}).populate("creator").sort({createdAt:-1});
   
        if(!postsOfUser.length){
          return NextResponse.json({message:"find user but seem he does not post anything",user,status:200}) 
        }
        return NextResponse.json({message:"fetched the posts of the user",posts:postsOfUser,status:200}) 
      }
   }
   else{
    
    const regexPattern = new RegExp(`^.*${searchText}.*$`, 'i');
    const prompt=await Prompt.find().where({prompt:{ $regex: regexPattern}}).populate("creator").sort({createdAt:-1});
   
    return NextResponse.json({message:"fetched prompt",posts:prompt,status:200})
   }

  } catch (error) {
    return NextResponse.json({message:"failed to fetch",status:422})
  }


}
