'use client'
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
    const { user } = useAuth();

    if (!user) {
        return <div>Please log in</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}