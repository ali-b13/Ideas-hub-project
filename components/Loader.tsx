import Image from 'next/image'
import React from 'react'

const Loader:any = () => {
  return (
    <>
    <Image src={"/assets/icons/loader.svg"} alt={"loader"} width={30} height={30}/>
    </>
  )
}

export default Loader