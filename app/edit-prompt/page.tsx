'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';
const EditPrompt = () => {
  const router=  useRouter();
  const isEdited=true
  const searchParams=useSearchParams();
  const postId=searchParams.get("id")
  const {data:session}=useSession();
  const [submitting,setSubmitting]=useState(false);
  const [post,setPost]=useState<any>({
    prompt:"",
    tag:''
  })
  async function handleSubmit(e:any){
    e.preventDefault()
    setSubmitting(true)
    
      try {
        const response = await fetch(`/api/prompt/${postId}`,{body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag,
          userId:session?.user?.id
        }),method:"PATCH"})
        console.log("Yees here it is ",response);
        let data=await  response.json()
       
        console.log(data.post,'data');//shows an error
         if(response.ok){
           router.push('/profile')
         }
      } catch (error) {
        console.log(error,'error')
      }
      finally{
        setSubmitting(false)
      }
  }
 useEffect(()=>{
   const getPost =async()=>{
     const response =await fetch(`/api/prompt/${postId}`,{method:"GET"})
     const data=await response.json()
     console.log(data,'data',response,'response')
     setPost({prompt:data.prompt.prompt,tag:data.prompt.tag})
   }
   getPost()
 },[postId])
  return (
    <div><Form
    type={"Edit"}
    isEdited={isEdited}
    handleSubmit={handleSubmit}
    post={post}
    setPost={setPost}
    setSubmitting={setSubmitting}
    submitting={submitting}
    />
    </div>
  )
}

export default EditPrompt