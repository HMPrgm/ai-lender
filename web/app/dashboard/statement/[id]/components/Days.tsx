import React from 'react'

export default function Days({days}:{days: number}) {
  return (
    <div className={days >= 120 ? 'text-green-800' : 'text-red-800'}>
        Over a period of {days} Days
    </div>
  )
}
