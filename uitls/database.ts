import mongoose from 'mongoose';
let isConnected:Boolean=false;
export const connectionDb=async()=>{
  mongoose.set("strictQuery",true)
  if(isConnected){
    console.log("Mongo db is connected")
    return;
  }
  try {
     await mongoose.connect(process.env.dbUri||"",{
      dbName:"share_promots",
     });
     isConnected=true
     console.log("mongo db connected")
  } catch (error) {
    console.log("error in db",error)
  }
}