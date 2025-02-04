'use client'
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div>Please log in</div>
    );
  }

  const handleLogOut = () => {
    logout()
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}