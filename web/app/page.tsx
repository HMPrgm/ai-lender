'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface MessageResponse {
  message: string
}

export default function Home() {
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    axios.get('auth/hello')
      .then(res => {
        setMessage(res.data.message)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div>
      <p>{loading ? "Loading..." : message}</p>
    </div>
  )
}
