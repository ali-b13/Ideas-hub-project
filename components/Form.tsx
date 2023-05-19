import React from 'react'

const Form = ({post,setPost,type,submitting,setSubmitting,handleSubmit}:any) => {
  return (
    <section className='flex flex-center flex-col gap-3 items-center w-full '>
      <h1 className='blue_gradient text-4xl font-semibold '>{type} Idea</h1>
       <p className=' text-md text-gray-400 font-medium text-center  md:w-[70%]'>Create and share amazing Ideas with the world ,and let your imagination run wild with any Ideas Hub platform</p>
      <form onSubmit={handleSubmit} className='mt-6 w-[80%] flex items-center flex-col gap-8 glass_effect   p-3'>
        <label className='flex flex-col items-center gap-3  w-full'>
          <span className='text-gray-600 font-bold  self-start md:self-center'>Your Input Field</span>
          <textarea  value={post.prompt} onChange={(e)=>setPost({...post,prompt:e.target.value})} className='text_area w-[100%] md:w-[60%] h-[8rem] self-start md:self-center' placeholder='Write Your Idea here ...'/>
        </label>
        <label className='flex flex-col items-center gap-3  w-full'>
          <span className='text-gray-600 font-bold self-start md:self-center'>Tag (#trend ,#web ,#java )</span>
          <input value={post.tag} onChange={(e)=>setPost({...post,tag:e.target.value})} className='input w-[100%]  md:w-[60%] self-start md:self-center ' placeholder=' #Tag '/>
        </label>
        <button disabled={submitting} type='submit'  className='btn_submit'> {submitting?`${type}...`:`${type} Idea`}</button>
      </form>
    </section>
  )
}

export default Form