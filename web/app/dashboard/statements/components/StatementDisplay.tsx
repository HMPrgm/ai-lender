import React from 'react'
import { Statement } from '../page'
import Link from 'next/link'

export default function StatementDisplay({statement}:{statement:Statement}) {
  return (
    <div>
        <h2 className='text-xl'>
            {statement.title}: <span className='text-gray-400'>{statement.id}</span>
        </h2>
        <Link className='text-blue-800 underline' href={`/dashboard/statement/${statement.id}`}>Go To</Link>
    </div>
  )
}
