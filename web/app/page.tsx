'use client'
import { useEffect, useState } from 'react'

interface MessageResponse {
  message: string
}

export default function Home() {
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/v1/hello')
      .then(res => res.json())
      .then((data: MessageResponse) => {
        setMessage(data.message)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <p>{loading ? "Loading..." : message}</p>
    </div>
  )
}
