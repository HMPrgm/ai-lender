// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }:{ children:any }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return user ? children : null;
}
