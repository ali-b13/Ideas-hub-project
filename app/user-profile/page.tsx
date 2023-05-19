"use client";
import React, { useEffect, useState } from 'react'
import {useSearchParams} from 'next/navigation'
import Profile from '@components/Profile';
interface POST{
  _id:string,
  prompt:string,
  creator:{
    username:string,
    email:string,
    image:string,
    _id:string
  },
  tag:string,
  createdAt:string
}
const UserPage = () => {
  const [posts,setPosts]=useState<POST[]>([])
  const searchParams=useSearchParams();
  const userId=searchParams.get("userId");
  useEffect(()=>{
  const getUserPostsApi=async()=>{
    const response=await fetch(`/api/users/${userId}/posts`,{method:"GET"});
    console.log(response,'response')
    const data=await response.json();
    setPosts(data.posts)
  }
  getUserPostsApi()
  },[userId])
  return (
    <>
   <Profile
    name={posts[0]?.creator?.username}
    desc={`${posts[0]?.creator?.username}'s posts  profile`}
     posts={posts}
     user={{username:posts[0]?.creator?.username,image:posts[0]?.creator?.image}}
   />
    </>
  )
}

export default UserPage