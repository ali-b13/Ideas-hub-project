import NextAuth from "next-auth/next";
import {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/user"
import {connectionDb} from '@uitls/database'

const handler=NextAuth({
  providers:[
    GoogleProvider({
      clientId:process.env.GOOGLE_ID||"",
      clientSecret:process.env.GOOGLE_SECRET||""
    })
  ],
  callbacks:{
    async session<SessionI>({session}:any){
      // console.log(session,'sses')
      const sessionUser=await User.findOne({email:session.user.email});
     
      session.user.id= sessionUser._id
      
      return session
     },
     async signIn({profile}:any){
      console.log("in sign in")
          try {
            await connectionDb();
           const userExisted= await  User.findOne({email:profile.email})
          //  console.log(profile,'about to add it to')
          //  console.log(userExisted,'exist')
           if(!userExisted){
           const customer=  await User.create({
               email:profile.email,
               username:profile.name.replace(" "," ").toLowerCase(),
               image:profile.picture
             })
            //  console.log(customer,'created')
           }
            return true
          } catch (error) {
           console.log(error,'in db sign in')
           return false
          }
     }
    }
})
export {handler as GET ,handler as POST}