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
        <div className='flex flex-col items-center gap-4 my-4'>
            <h1 className='text-5xl font-light text-dark_1 mb-4 my-6'>{statement.title}</h1>
            <div className='mt-12 grid grid-cols-2 gap-4'>
                {<Outcome statement={statement} />}

                <div className='border py-12 px-12 rounded-xl text-center'>
                    <h2 className='text-5xl font-light mb-6'>Contributing Factors</h2>
                    <ul className='text-left flex flex-col gap-3 text-lg'>
                        <li className=''>
                            {<Slope slope={statement.slope} />}
                        </li>
                        <li>
                            {<Consistancy consistancy={statement.consistancy} />}
                        </li>
                        <li>
                            {<Change change_in_balance={statement.change_in_balance} />}
                        </li>
                        <li>
                            {<Days days={statement.days} />}
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}