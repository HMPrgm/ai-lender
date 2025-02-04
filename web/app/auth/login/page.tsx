'use client'
import { useAuth } from '../../hooks/useAuth'
import { useState, useEffect } from 'react';
import ErrorMessage from '@/app/components/ErrorMessage';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function Login() {
  const { login, user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleRedirect = () => {
    router.push('/dashboard/profile');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
      setError("Invalid credentials. Are you registered?")
    }
  };

  useEffect(() => {
    if (user) {
      handleRedirect()
    }
  }, [user])

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col gap-8 text-center my-12 border-2 border-black py-12 w-96'>
        <h1 className='text-4xl'>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 items-center'>
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
              <button className='px-4 py-1 border-2 border-black' type="submit">Login</button>
            </div>
            <div>
              <Link href="/auth/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

