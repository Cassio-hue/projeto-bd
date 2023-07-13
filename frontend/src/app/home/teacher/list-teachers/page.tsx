'use client'

import clsx from 'clsx'
import StickyHeadTable, { Data } from '../../../components/TeacherTable'
import { useEffect, useState } from 'react'
import { getAllTeachers } from '../../../api/api'

export default function ListTeachers() {
  const [teachers, setTeachers] = useState<Data[]>([])

  useEffect(() => {
    getAllTeachers().then((res) => setTeachers(res))
  }, [])

  console.log(teachers)

  return (
    <div className={clsx('p-4 w-full')}>
        {teachers.length > 0 ? (
          <StickyHeadTable rows={teachers} />
        ) : ''}
    </div>
  )
}
