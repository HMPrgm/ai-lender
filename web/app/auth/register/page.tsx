'use client'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/app/components/ErrorMessage';
import Link from 'next/link'

export default function Register() {
    const { register, user } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleRedirect = () => {
        router.push('/dashboard/statements');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return 
        }

        try {
            const message: string|null = await register(email, password, name);
            if (message !== null) {
                setError(message)
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError("Registration Failed")
        }
    };

    useEffect(() => {
        if (user) {
            handleRedirect()
        }
    }, [user])

    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col gap-8  my-12 border rounded-lg py-12 w-[30em] px-16'>
                <h1 className='text-3xl text-dark_1'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-dark_4 text-sm' htmlFor="email">Name</label>
                            <input className='border transition-colors focus:outline-none focus:border-dark_4 rounded-lg px-2 py-1' name="name" type="text" required />
                        </div>
                        <div className='flex gap-1 flex-col'>
                            <label className='text-dark_4 text-sm' htmlFor="email">Email</label>
                            <input className='border transition-colors focus:outline-none focus:border-dark_4 rounded-lg px-2 py-1' name="email" type="email" required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className='text-dark_4 text-sm'>Password</label>
                            <input className='border transition-colors focus:outline-none focus:border-dark_4 rounded-lg px-2 py-1' name="password" type="password" required />
                        </div>
                        {error && <ErrorMessage message={error} />}
                        <div className='text-sm text-dark_4'>
                            Already have an account? <Link href="/auth/login" className='text-secondary hover:text-primary transition-colors'>Log in</Link>
                        </div>
                        <div>
                            <button className='px-4 py-1 mt-2 border-2 border-primary text-white bg-primary hover:text-primary hover:bg-white rounded-lg transition-colors ease-linear' type="submit">Register</button>
                        </div>
            
                    </div>
                </form>
            </div>
        </div>
    );
}

