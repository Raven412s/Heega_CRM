"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface NavbarProps {
  user?: string;
}

const Nav: React.FC<NavbarProps> = ({ user }) => {
  const router = useRouter();

  const handleLogoClick = () => {
    if (!user) {
      router.push('/');
    }
  };

  return (
    <nav className="h-32 px-8 flex items-center bg-blue-500">
      <div className="container mx-auto flex justify-between items-center">
        <div onClick={handleLogoClick} className="cursor-pointer">
          <Image src="/Images/Heega-Logo.webp" alt="Heega Sports" height={75} width={75} />
        </div>
        <div className="flex space-x-4">
          <Link href="https://heegasports.com" target='_blank'>
            <p className="text-white">E-commerce</p>
          </Link>
          <Link href="#login">
            <p className="text-white">Login/Register</p>
          </Link>
          <Link href="/superAdmin">
            <p className="text-white">SuperAdmin</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
