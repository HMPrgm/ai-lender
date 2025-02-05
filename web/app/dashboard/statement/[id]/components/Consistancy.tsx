import React from 'react'

export default function Consistancy({ consistancy }: { consistancy: number }) {

    if (consistancy > 1) {
        return (
            <div className='text-red-800'>
                Inconsistant Expenses and Income
            </div>
        )
    }
    return (
        <div className='text-green-800'>
            Consistant Expenses and Income
        </div>
    )
}
