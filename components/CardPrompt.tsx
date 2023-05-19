"use client";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import {useCopyToClipboard} from 'react-use'
const CardPrompt = ({post,handleTagClick,handleDelete,handleEdit}:any) => {
  const {data:session}=useSession()
  const pathname=usePathname()
  const [state,copyToClipboard]=useCopyToClipboard()
  const [copied,setCopied]=useState(false)
  const handleCopyText=()=>{
    setCopied(true)
    copyToClipboard(post.prompt)
    setTimeout(()=>{
      setCopied(false)
    },3000)
  }
  
  return (
    <section className='card w-full md:w-[70%]    p-2  '>
    <div className='flex flex-row justify-between'>
      <div className='flex justify-start gap-3 items-start'>
       <Link href={session?.user.id==post.creator._id?`/profile` :`/user-profile?userId=${post.creator._id}`}><Image src={post.creator.image} width={40} height={40} alt='user_image' className='rounded-lg self-center'/></Link>
       <div className='flex flex-col '>
        <div className='flex gap-3 items-center'>
        <h1 className='text-xl font-semibold text-slate-700'>{post.creator.username[0].toUpperCase()+post.creator.username.slice(1)}</h1>
        <Image src={"/assets/icons/verified.svg"} width={20} height={20} alt='verified_icon'/>
        </div>
        <h1 className='text-sm font-thin text-slate-800'>{post.creator.email}</h1>
       </div>
      </div>
      <Image onClick={handleCopyText} src={copied?'/assets/icons/tick.svg':'/assets/icons/copy.svg'} alt='copy' width={25} height={25}/>
    </div>
     <div className='flex flex-col gap-3 mt-4'>
     <p className='text-gray-700 '>{post.prompt}</p>
     <p  onClick={()=>handleTagClick(post.tag)} className='text-blue-600 cursor-pointer w-[fit-content]'>{post.tag}</p>
     {
      session?.user.id==post.creator._id && pathname=="/profile"&&(
        <div className='flex items-center gap-3 w-[50%] md:w-[25%]  '>
          <button onClick={()=>handleEdit(post._id)} className='bg-amber-400 rounded-md w-[80%] text-white border-none p-1 text-xs md:text-sm'>Edit</button>
          <button onClick={()=>handleDelete(post._id)} className='bg-red-500 rounded-md w-[80%] text-white border-none p-1  text-xs md:text-sm'>Delete</button>
        </div>
      )
     }
     </div>
    </section>
  )
}

export default CardPrompt