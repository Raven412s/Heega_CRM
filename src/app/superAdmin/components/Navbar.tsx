import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import logo from "../../../../public/Images/Heega-Logo.webp"
import ThemeSwitcher from '@/components/ThemeSwitcher'


const Navbar = () => {
  return (
    <div className='bg-gray-400 dark:bg-slate-700 py-2 px-5 flex justify-between text-white items-center'>
        <Link href={"/"}>
        <Image src={logo} alt='logo' width={50} height={50}/>
        </Link>
        <div className='flex gap-4 items-center'>
        <ThemeSwitcher/> <UserButton/>
        </div>
    </div>
  )
}

export default Navbar
