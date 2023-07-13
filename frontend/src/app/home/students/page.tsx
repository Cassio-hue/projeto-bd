'use client'
import clsx from 'clsx'
import StickyHeadTable, {
  StudentTableData,
} from '../../components/StudentTable'
import { useEffect, useState } from 'react'
import { getAllStudents } from '../../api/api'

export default function ListStudents() {
  const [students, setStudents] = useState<StudentTableData[]>([])

  useEffect(() => {
    getAllStudents()
      .then((res) => setStudents(res))
      .catch(() => alert('Erro ao listar professores do sistema'))
  }, [])

  return (
    <div className={clsx('p-4 w-full')}>
      {students.length > 0 ? <StickyHeadTable rows={students} /> : ''}
    </div>
  )
}
