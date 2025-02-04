import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
    user: any;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }:{ children:any }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/check', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                router.push('/dashboard');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
