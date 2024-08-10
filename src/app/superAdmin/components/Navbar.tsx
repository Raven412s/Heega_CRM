import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from "../../../../public/Images/Heega-Logo.webp"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


const Navbar = () => {
  return (
    <div className='bg-gray-400 dark:bg-slate-700 py-2 px-5 flex justify-between text-white items-center'>
        <Link href={"/"}>
        <Image src={logo} alt='logo' width={50} height={50}/>
        </Link>



        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'>
                <Avatar>
                    <AvatarImage src='http://github.com/shadcn.png' alt='@shadcn' />
                    <AvatarFallback className='text-blue-950 text-lg font-bold'>AS</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
               <DropdownMenuItem>
               <Link href={"/profile"}>Profile</Link>
               </DropdownMenuItem>
               <DropdownMenuItem>
               <Link href={"/auth"}>Logout</Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


    </div>
  )
}

export default Navbar
