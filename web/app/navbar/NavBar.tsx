'use client'
import React from 'react'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';

export default function NavBar() {
    const { user } = useAuth();


    return (
        <nav>
            <div className='flex justify-between border-b'>
                <Link className='px-6 py-4 font-light text-3xl' href='/'>AI Lender</Link>
                <div>{user ? <LoggedIn /> : <LoggedOut />}</div>
            </div>
        </nav>
    )
}

