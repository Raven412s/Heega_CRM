import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import logo from "../../public/Images/Heega-Logo.webp"
import { ModeToggle } from './ui/mode-toggle'


const Navbar = () => {
  return (
    <div className='bg-gray-400 dark:bg-slate-700 py-2 px-5 flex justify-between  z-50 text-white items-center'>
        <Image src={logo} alt='logo' width={50} height={50}/>
        <div className='flex gap-4 items-center'>
        <ModeToggle/> <UserButton/>
        </div>
    </div>
  )
}

export default Navbar
