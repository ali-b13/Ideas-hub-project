"use client";
import React, { useEffect, useState } from 'react'
import { useSearchParams,useRouter } from 'next/navigation'
import CardPrompt from '@components/CardPrompt';

const Tags = () => {
  const params=useSearchParams()
  const [posts,setPosts]=useState([])
  const tagName=params.get("tagName")
  useEffect(()=>{
    const fetchTagsPostsApi=async()=>{
      const response=await fetch(`/api/prompt/tags/${tagName}`,{method:"POST"})
      const data =await response.json();
     setPosts(data.posts)
    }
    fetchTagsPostsApi()
  },[tagName])
  return (
    <div className='w-full flex flex-col items-center gap-4 '>
      <h1 className='text-4xl text-gray-400 font-semibold'>All Related Tag {tagName} posts </h1>
      <div className='w-full flex items-center flex-col gap-3'>
        {posts?.map((post:any)=>{
          return (
            <CardPrompt
            key={post._id}
            post={post}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Tags