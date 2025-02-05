import React from 'react'
import Link from 'next/link'

export default function LoggedOut() {
  return (
    <div className='flex'>
        <Link href='/auth/login' className='navbar-link'>Log In</Link>
        <Link href='/auth/register' className='navbar-link mr-4'>Register</Link>
    </div>
  )
}
