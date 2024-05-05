"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import CardPrompt from './CardPrompt';
const Profile = ({name,desc,posts,user,handleDelete,handleEdit}:any) => {
  return (
    <div className='flex flex-col md:justify-between; md:flex-row h-[calc(100vh-70px)]  w-full'>
    
      <div className='flex flex-col gap-5 m-3  '>
         <h1 className='text-blue-400 text-3xl font-extrabold '>{name} Profile</h1>
        <div className='user_info w-full flex  gap-5 items-center'>
           <Image className='rounded-full' src={user.image?.toString()||""} width={30} height={30} alt='user_image '/>
           <span className='text-lg text-blue-300 font-extrabold'>{user.username}</span>
           <Image src={"/assets/icons/verified.svg"} width={30} height={30} alt='verified_icon'/>
        </div>
       </div>
       <div className='vertical_line'></div>
       <div className='flex-1 flex justify-start flex-col gap-5 ml-3 '>
       {
      posts?.map((prompt:any)=>{
        return (
          <CardPrompt
          key={prompt._id}
           post={prompt}
           handleEdit={handleEdit}
           handleDelete={handleDelete}
          
          />
        )
      })
    }
       </div>
    </div>
  )
}

export default Profile