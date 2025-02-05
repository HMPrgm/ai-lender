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
            <div className='flex justify-between'>
                <Link className='navbar-link font-bold' href='/'>Henry's Casca Assignment</Link>
                <div>{user ? <LoggedIn /> : <LoggedOut />}</div>
            </div>
        </nav>
    )
}

