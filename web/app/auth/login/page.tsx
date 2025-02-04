import { useAuth } from '../../hooks/useAuth'

export default function Login() {
    const { login } = useAuth();

    const handleSubmit = async (e) => {
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
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" required />
            <input name="password" type="password" required />
            <button type="submit">Login</button>
        </form>
    );
}