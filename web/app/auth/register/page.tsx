'use client'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/app/components/ErrorMessage';
import Link from 'next/link'

export default function Login() {
    const { register, user } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleRedirect = () => {
        router.push('/dashboard/profile');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        try {
            await register(email, password, name);
        } catch (error) {
            console.error('Login failed:', error);
            setError("Registration Failed")
        }
    };

    useEffect(()=>{
        if (user) {
            handleRedirect()
        }
    },[user])

    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col gap-8 text-center my-12 border-2 border-black py-12 w-96'>
                <h1 className='text-4xl'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='flex gap-4'>
                            <label htmlFor="email">Name</label>
                            <input className='border-black border-2' name="name" type="text" required />
                        </div>
                        <div className='flex gap-4'>
                            <label htmlFor="email">Email</label>
                            <input className='border-black border-2' name="email" type="email" required />
                        </div>
                        <div className='flex gap-4'>
                            <label htmlFor="password">Password</label>
                            <input className='border-black border-2' name="password" type="password" required />
                        </div>
                        {error && <ErrorMessage message={error} />}
                        <div>
                            <button className='px-4 py-1 border-2 border-black' type="submit">Register</button>
                        </div>
                        <div>
                            <Link href="/auth/login">Log In</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

