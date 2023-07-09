'use client'

import { useEffect } from 'react'
import { getStudentData, isAuthenticated } from '../api/api'
import Link from 'next/link'
import { Button } from '../components/Button'

export default function Home() {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }

    const email = localStorage.getItem('email')
    if (email) {
      getStudentData(email).then((data) => {
        localStorage.setItem('admin', data.is_admin)
      })
    }
  })

  const admin = localStorage.getItem('admin')

  if (admin === 'true') {
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
  } else {
    return (
      <div className="flex flex-col gap-5 w-44">
        <Link href={'home/class'}>
          <Button>Turmas</Button>
        </Link>
      </div>
    )
  }
  
}
