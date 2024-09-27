"use client"

import React from 'react';
import { navLink } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className='h-screen sticky top-0 left-0 abg-[#00000067] border-r-[1px] border-gray-700 rounded-r-md  p-5 flex flex-col gap-8 shadow-2xl max-lg:hidden'>
      <h2 className='text-3xl font-extrabold text-white mb-2 p-4 tracking-wider'>
        Lawyer<span className='text-blue-500'>Meet</span>
      </h2>
      <div className='flex flex-col gap-3'>
        {navLink.map((link, index) => (
          <Link href={link.url} key={index} className={`flex items-center gap-4 text-lg transition-transform duration-300 ease-in-out p-4 px-10 rounded-lg    hover:bg-gray-800
            ${pathname === link.url ? "text-blue-500 bg-gray-800 translate-x-1" : "text-white"} hover:text-blue-400`}>
            <div className='text-xl'>{link.icon}</div>
            <label className='cursor-pointer'>{link.label}</label>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;