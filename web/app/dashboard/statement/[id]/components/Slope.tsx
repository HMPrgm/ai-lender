import React from 'react'

export default function Slope({ slope }: { slope: number }) {

    if (slope > 0) {
        return (
            <div className='text-green-800'>
                More Income Than Expenses
            </div>
        )
    }

    return (
        <div className='text-red-800'>
            More Expenses Than Income
        </div>
    )
}
