"use client"

import React, { useState } from 'react';
import { navLink } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

const TopBar: React.FC = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const pathname = usePathname();

    return (
        <div className='sticky top-0 z-20 w-full flex justify-between items-center px-6 py-3 shadow-lg lg:hidden border-b-[1px] rounded-b-md border-gray-700 backdrop-blur-xl'>
            <h2 className='text-2xl font-extrabold text-white tracking-wider'>
                Lawyer<span className='text-blue-500'>Meet</span>
            </h2>
            <div className='flex gap-8 max-sm:hidden'>
                {navLink.map((link, index) => (
                    <Link
                        href={link.url}
                        key={index}
                        className={`flex items-center gap-2 text-sm text-white transition-transform duration-300 ease-in-out py-2 rounded-lg ${pathname === link.url ? "text-blue-500 shadow-lg scale-105" : "text-white"} hover:text-blue-400`}
                    >
                        <div className='text-md'>{link.icon}</div>
                        <label className='cursor-pointer'>{link.label}</label>
                    </Link>
                ))}
            </div>
            <div className="relative flex gap-4 items-center">
                <Menu strokeWidth={1}
                    className="cursor-pointer text-white sm:hidden"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                />
                {dropdownMenu && (
                    <div className="absolute top-12 right-0 flex flex-col gap-4 p-5 bg-gray-800 shadow-xl rounded-lg">
                        {navLink.map((link) => (
                            <Link
                                href={link.url}
                                key={link.label}
                                className={`flex items-center gap-2 text-white transition-transform duration-300 ease-in-out p-2 rounded-lg ${pathname === link.url ? "text-blue-500 shadow-lg scale-105" : "text-white"} hover:text-blue-400`}
                            >
                                <div className='text-xl'>{link.icon}</div>
                                <p>{link.label}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopBar;