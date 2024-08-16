"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { FaRegSun, FaRegMoon, FaDesktop } from "react-icons/fa";

function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        }, [])
    if(!mounted)return null;
  return (
    <Tabs defaultValue={theme} className='rounded-full'>
        <TabsList className='p-0 h-7 '>
            <TabsTrigger value='light' onClick={()=>{setTheme("light")}} className='m-0 '>
                <FaRegSun className='h-3 w-3 '/>
            </TabsTrigger>
            <TabsTrigger value='dark' onClick={()=>{setTheme("dark")}} className='m-0 '>
                <FaRegMoon className='h-3 w-3  -rotate-90 transition-all dark:rotate-0'/>
            </TabsTrigger>
            <TabsTrigger value='system' onClick={()=>{setTheme("system")}} className='m-0 '>
                <FaDesktop className='h-3 w-3 '/>
            </TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher
