
import mongoose from "mongoose";
export async function  connectionDb(){
  
    try {
      mongoose.set("strictQuery",true)
       await  mongoose.connect(process.env.dbUri as string,{autoCreate:false,dbName:"share_promots",})
        console.log("connected to mongoDB successfully")
    } catch (error) {
        console.log(error)
       
    }
}

export async function disconnectionDb(){
    try {
        await  mongoose.disconnect()
         console.log("disconnect to mongoDB ")
     } catch (error) {
         console.log(error)
        
     }
}
