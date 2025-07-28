import React from 'react'
import "./banner.module.css"
import banner from "../../assets/images/4739023.jpg"
export default function Banner() {
  return (
   <div className="w-full h-[30vh] overflow-hidden my-0">
      
      <img className='w-full h-full object-cover ' src={banner} alt="Banner" />
    </div>
  )
}
