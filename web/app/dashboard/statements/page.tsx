'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Statement {
    id: number;
    title: string;
    time_added: Date;
    slope: number;
    consistancy: number;
    change_in_balance: number;
    // user_id: number;
}



export default function StatementPage() {
    const [statements, setStatements] = useState<Statement[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatement = async () => {
            
            try {
                const { data } = await axios.get(
                    `/api/statements/`,
                    { withCredentials: true }
                );
                setStatements(data);
            } catch (error) {
                setError('Failed to fetch statement');
                console.error('Error fetching statement:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatement();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!statements) return <div>Statement not found</div>;

    return (
        <div>
            {statements.map(s => <h1 key={s.id}>Statement {s.id}</h1>)}
        </div>
    );
}