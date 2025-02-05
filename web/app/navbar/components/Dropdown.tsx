'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';

interface NavbarLink {
    name: string;
    link: string
}

const links: NavbarLink[] = [
    {
        name: 'Upload Statement',
        link: '/dashboard/upload'
    },
    {
        name: 'Past Statements',
        link: '/dashboard/profile'
    },
    {
        name: 'Profile',
        link: '/dashboard/profile'
    },
    {
        name: 'About',
        link: '/about'
    },
    // TODO
    // {
    //     name: 'Log Out',
    //     link: ''
    // },
]

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useAuth()

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg"
            >
                Hi, {user.name}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                >
                    <path d="M7 10l5 5 5-5" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                        {links.map(l => <Link href={l.link} className='block px-4 py-2 hover:bg-gray-100'>{l.name}</Link>)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}