'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Statement } from '../../statements/page';

export default function StatementPage() {
    const [statement, setStatement] = useState<Statement | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        console.log("HELLO")
        const fetchStatement = async () => {
            
            try {
                const { data } = await axios.get(
                    `/api/statement/${id}`,
                    { withCredentials: true }
                );
                setStatement(data);
            } catch (error) {
                setError('Failed to fetch statement');
                console.error('Error fetching statement:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchStatement();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!statement) return <div>Statement not found</div>;

    return (
        <div>
            <h1>Statement {statement.id}</h1>
            {/* Render your statement data here */}
        </div>
    );
}