"use client";
import React, { useEffect, useState } from "react";
import CardPrompt from "./CardPrompt";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const CardLists=({data,handleTagClick}:any)=>{
   return (
    <>
    {
     data?.length>=0&& data?.map((prompt:any)=>{
        return (
          <CardPrompt
          key={prompt._id}
           post={prompt}
           handleTagClick={handleTagClick}
          />
        )
      })
    }
    </>
   )
}
const Feed = () => {
  const {data:session}=useSession()
  const router=useRouter()
	const [searchText, setSearchText] = useState("");
  const [prompts,setPrompts]=useState([]);

  const handleTagClick=(tag:string)=>{
    console.log(tag,'tag')
    router.push(`/tags?tagName=${tag.slice(1)}`)
  }
	const handleSearchInput = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleTextOnChange()
  };
  const fetchResultApi=async(type:string)=>{
    const res=await fetch("/api/prompt/search",{method:"POST",body:JSON.stringify({type,searchText})})
   const data=await res.json()
   setPrompts(data.posts)
  }
  const handleTextOnChange=()=>{
    const typeOfSearch=searchText[0]?.trim();
    if(typeOfSearch=="@"){
      fetchResultApi("@")
    }
   else if(typeOfSearch=="#"){
    fetchResultApi("#")
    }
    else{
      fetchResultApi("prompt")
    }
  }
  
  const fetchPromptsApi=async()=>{
    const response =await fetch("/api/prompt/prompts");
     const data=await response.json();
     setPrompts(data.data)
   
  }
  useEffect(()=>{
      fetchPromptsApi();
      const interval = setInterval(fetchPromptsApi, 5000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);

    
  },[])
	return (
		<>
			<form onSubmit={handleSearchInput}  className="w-full md:w-[50%] flex justify-center ">
				<input
					className="search_input w-[60%]  md:w-[80%] text-xs "
					placeholder="Search for #Tag , @username , ideas "
          onChange={(e)=>setSearchText(e.target.value)}
				/>
				<button type="submit" className="btn_search text-sm md:text-base">
					Search
				</button>
			</form>
      <CardLists
      data={prompts}
      handleTagClick={handleTagClick}
      />
    
		</>
	);
};



export default Feed;
