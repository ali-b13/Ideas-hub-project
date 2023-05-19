import { Schema,model,models } from "mongoose";
const user =new Schema ({
  email:{
    type:String,
    unique:[true,"email already exists"],
    required:[true,'email is required']
  },
  username:{
    type:String,
    unique:[true,"username already exists"],
    required:[true,'username is required']
  },
  image:{
    type:String
  }
})
const User =models.User || model("User",user);
export default User