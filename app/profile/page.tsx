"use client";
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
interface USER{
  username:string,
  image:string
}
import Model from '@components/Model'
const MyProfile = () => {
  const [isModelOpen,setIsModelOpen]=useState(false);
  const [shouldBeDeleted,setShouldBeDeleted]=useState(null)
  const onClose=()=>{
    setIsModelOpen(false)
  }

  const router=useRouter()
  const {data:session}=useSession()
  
  const [posts,setPosts]=useState([]);
  const handleEdit=async(id:string)=>{
       router.push(`/edit-prompt?id=${id}`)
  }
  const deletedPostConfirmed=async()=>{
    const response =await fetch(`/api/prompt/${shouldBeDeleted}`,{method:"DELETE"});
    console.log(response,'respone')
    const data =await  response.json()
    console.log(data,'data')
     if(response.ok){
      fetchUserPost()
      onClose()
     }
  }
  const handleDelete=async(postId:any)=>{
   setIsModelOpen(true)
   setShouldBeDeleted(postId)
   
  }
  const fetchUserPost=async()=>{
    const response=await fetch(`/api/users/${session?.user.id}/posts`,{method:"GET"});
    console.log(response,'response')
    const data=await response.json();
    setPosts(data.posts)
  }
  useEffect(()=>{
      if(session?.user.id){
        fetchUserPost()
      }
  },[session?.user.id])
  console.log(posts,'got posts')
  return (
  <>
   <Profile
   name={"My"}
   desc={"Welcome to your Personalized Profile Page"}
   handleEdit={handleEdit}
   handleDelete={handleDelete}
    posts={posts}
    user={{username:session?.user?.name,image:session?.user.image}}

   />
   <Model isOpen={isModelOpen} >
    <div className='flex flex-col gap-5'>
   <h1 className='text-gray-500 font-bold '>Are sure  you want to delete this post ?</h1>
   <div className='flex gap-3 items-center'>
          <button onClick={deletedPostConfirmed} className=' text-red-500 font-semibold' >Delete </button>
          <button onClick={onClose} className='font-semibold'>Cancel</button>
        </div>
    </div>
        
   </Model>
  </>
  )
}

export default MyProfile