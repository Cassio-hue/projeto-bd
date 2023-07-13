'use client'

import clsx from 'clsx'
import StickyHeadTable, {
  DepartmentTableData,
} from '../../../components/TeacherTable'
import { useEffect, useState } from 'react'
import { getAllTeachers } from '../../../api/api'

export default function ListTeachers() {
  const [teachers, setTeachers] = useState<DepartmentTableData[]>([])

  useEffect(() => {
    getAllTeachers()
      .then((res) => setTeachers(res))
      .catch(() => alert('Erro ao listar professores do sistema'))
  }, [])

  return (
    <div className={clsx('p-4 w-full')}>
      {teachers.length > 0 ? <StickyHeadTable rows={teachers} /> : ''}
    </div>
  )
}
