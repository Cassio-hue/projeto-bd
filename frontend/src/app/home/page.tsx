'use client'

import { useEffect, useState } from 'react'
import { getStudentData, isAuthenticated } from '../api/api'
import Link from 'next/link'
import { Button } from '../components/Button'

export default function Home() {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }

    const email = localStorage.getItem('email')
    if (email) {
      getStudentData(email).then((data) => {
        localStorage.setItem('admin', data.is_admin)
        if (data.is_admin === true) {
          setAdmin(true)
        }
      })
    }
  })

  if (admin) {
    return (
      <div className="flex flex-col gap-5 w-44">
        <Link href={'home/teacher'}>
          <Button>Professor</Button>
        </Link>
        <Link href={'home/students'}>
          <Button>Estudante</Button>
        </Link>
        <Link href={'home/departments'}>
          <Button>Departamento</Button>
        </Link>
        <Link href={'/class'}>
          <Button>Turmas</Button>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-5 w-44">
        <Link href={'/class'}>
          <Button>Turmas</Button>
        </Link>
      </div>
    )
  }
}
