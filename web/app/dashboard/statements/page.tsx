'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import StatementDisplay from './components/StatementDisplay';
import Link from 'next/link';

export interface Statement {
    id: number;
    title: string;
    time_added: Date;
    slope: number;
    consistancy: number;
    change_in_balance: number;
    days: number;
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
        <div className='flex flex-col gap-12 justify-center pb-24'>
            <h1 className='text-dark_1 text-5xl font-light text-center mt-12'>Bank Statements</h1>
            <div className='mx-48'>
                <div className='grid grid-cols-8 text-dark_4 mx-2'>
                    <div>Date</div>
                    <div className='col-span-3'>Name</div>
                    <div className='col-span-4'>Classification</div>
                </div>
                <hr className='col-span-8'/>
                {statements.map(s => <StatementDisplay statement={s} key={s.id} />)}

                <div className='grid grid-cols-8'>
                    <Link href='/dashboard/upload' className='px-2 py-2 text-dark_4 hover:bg-slate-50 col-span-8 transition-colors'>+ Upload Statement</Link>
                </div>
            </div>
        </div>
    );
}