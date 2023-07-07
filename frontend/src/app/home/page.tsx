'use client'

import { useEffect } from 'react'
import { isAuthenticated } from '../api/api'

export default function Home() {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }
  })

  return (
    <>
      <h1>Olá mundo!</h1>
    </>
  )
}
