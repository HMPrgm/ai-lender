'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Statement } from '../../statements/page';
import Slope from './components/Slope';
import Consistancy from './components/Consistancy';
import Days from './components/Days';
import Change from './components/Change';
import Outcome from './components/Outcome';

export default function StatementPage() {
    const [statement, setStatement] = useState<Statement | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
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
        <div className='ml-3'>
            <h1 className='text-3xl mb-4'>{statement.title}</h1>
            {<Slope slope={statement.slope}/>}
            {<Consistancy consistancy={statement.consistancy}/>}
            {<Change change_in_balance={statement.change_in_balance}/>}
            {<Days days={statement.days}/>}

            {<Outcome statement={statement}/>}
        </div>
    );
}