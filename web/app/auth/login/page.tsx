'use client'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
            <div>
              <button className='px-4 py-1 border-2 border-black' type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}