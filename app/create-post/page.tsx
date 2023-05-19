'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
const CreatePrompt = () => {
  const router=useRouter()
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
        const response = await fetch("/api/prompt/new",{body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag,
          userId:session?.user?.id
        }),method:"POST"})
        console.log("Yees here it is ",response);
        let data=await  response.json()
        let newPrompt=await JSON.parse(data.newPrompt)
        console.log(newPrompt,'data');//shows an error
         if(response.ok){
          router.push('/')
         }
      } catch (error) {
        console.log(error,'error')
      }
      finally{
        setSubmitting(false)
      }
  }
  return (
    <div><Form
    type={"Create"}
    handleSubmit={handleSubmit}
    post={post}
    setPost={setPost}
    setSubmitting={setSubmitting}
    submitting={submitting}
    />
    </div>
  )
}

export default CreatePrompt