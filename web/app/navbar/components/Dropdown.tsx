'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

interface NavbarLink {
    name: string;
    link: string;
    func: undefined | (() => Promise<void>)
}



export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const { user, logout } = useAuth()
    const router = useRouter();


    const links: NavbarLink[] = [
        {
            name: 'Upload Statement',
            link: '/dashboard/upload',
            func: undefined
        },
        {
            name: 'Past Statements',
            link: '/dashboard/statements',
            func: undefined
        },
        {
            name: 'Profile',
            link: '/dashboard/profile',
            func: undefined
        },
        {
            name: 'About',
            link: '/about',
            func: undefined
        },
        // TODO
        {
            name: 'Log Out',
            link: '/auth/login',
            func: async () => {
                await logout()
            }
        },
    ]

    const handleLinkClick = async (l: NavbarLink) => {
        if (l.func) {
            await l.func()
        }
        router.push(l.link)
    }


    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 mx-2 my-2 hover:bg-gray-100 text-dark_2 transition-colors rounded-lg"
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
                        className="absolute right-0 mt-4 w-48 bg-white rounded-lg border py-2"
                    >
                        {links.map(l => <button onClick={() => handleLinkClick(l)} className='block px-4 py-2 text-dark_2 hover:text-dark_4 transition-colors'>{l.name}</button>)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}