import React from 'react'
import {useState }from 'react'
import "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { useTheme } from '../../context/ThemeContext'
import "./Layout.module.css"
export default function Layout() {
  const { isDarkMode } = useTheme();
  
  return (
    <>
     <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      <Navbar />
      <div className="container mx-auto min-h-screen">
          <Outlet />
      </div>
      {/* <Footer/> */}
    </div>
   
  </>
  )
}
