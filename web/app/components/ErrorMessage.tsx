import React from 'react'

export default function ErrorMessage({message}:{message:string}) {
  return (
    <div className='text-red-800'>
        {message}
    </div>
  )
}
