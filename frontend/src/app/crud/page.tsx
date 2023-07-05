'use client'

import Link from 'next/link'
import { Button } from '../components/Button'

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-44">
      <Link href={'crud/teacher'}>
        <Button>Professor</Button>
      </Link>
      <Link href={'crud/student'}>
        <Button>Estudante</Button>
      </Link>
      <Link href={'crud/department'}>
        <Button>Departamento</Button>
      </Link>
    </div>
  )
}
