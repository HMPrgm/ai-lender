import React from 'react'

export default function Slope({ slope }: { slope: number }) {

    if (slope > 0) {
        return (
            <div className='text-green-800'>
                On average more income than expenses
            </div>
        )
    }

    return (
        <div className='text-red-800'>
            On average more Expenses Than Income
        </div>
    )
}
