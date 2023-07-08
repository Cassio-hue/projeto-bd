'use client'

import { useEffect } from 'react'
import { isAuthenticated } from '../api/api'
import Link from 'next/link'
import { Button } from '../components/Button'

export default function Home() {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }
  })

  return (
    <div className="flex flex-col gap-5 w-44">
      <Link href={'home/teacher'}>
        <Button>Professor</Button>
      </Link>
      <Link href={'home/student'}>
        <Button>Estudante</Button>
      </Link>
      <Link href={'home/department'}>
        <Button>Departamento</Button>
      </Link>
    </div>
  )
}
