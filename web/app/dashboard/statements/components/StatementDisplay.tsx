import React from 'react'
import { Statement } from '../page'
import Link from 'next/link'
import Outcome from './Outcome'

export default function StatementDisplay({statement}:{statement:Statement}) {


    const getDate = () => {
        const date = new Date(statement.time_added)
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    }

  return (
    <div>
        <Link href={`/dashboard/statement/${statement.id}`} className='grid grid-cols-8 py-2 text-dark_2 hover:bg-slate-50 transition-colors px-2'>
            <div>{getDate()}</div>
            <div className='col-span-3'>
                {statement.title}
            </div>
            <div className='col-span-4'>
                <Outcome statement={statement}></Outcome>
            </div>
        </Link>
        <hr className='col-span-8'/>
    </div>
  )
}
