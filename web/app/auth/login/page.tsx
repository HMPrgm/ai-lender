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
      <div className='flex flex-col gap-8  my-12 border rounded-lg py-12 w-[30em] px-16'>
        <h1 className='text-3xl'>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 '>
            <div className='flex flex-col gap-1 '>
              <label htmlFor="email" className='text-dark_4 text-sm'>Email</label>
              <input className='border transition-colors focus:outline-none focus:border-dark_4 rounded-lg px-2 py-1' name="email" type="email" required />
            </div>
            <div className='flex flex-col gap-1 '>
              <label htmlFor="password" className='text-dark_4 text-sm'>Password</label>
              <input className='border transition-colors focus:outline-none focus:border-dark_4 rounded-lg px-2 py-1' name="password" type="password" required />
            </div>
            {error && <ErrorMessage message={error} />}
            <div className='text-sm text-dark_4'>
              Don't have an account? <Link href="/auth/register" className='text-secondary hover:text-primary transition-colors'>Register</Link>
            </div>
            <div>
              <button className='px-4 py-1 mt-2 border-2 border-primary text-white bg-primary hover:text-primary hover:bg-white rounded-lg transition-colors ease-linear' type="submit">Login</button>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
}

