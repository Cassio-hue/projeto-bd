'use client'

import { useEffect, useState } from 'react'
import { CardClass, ClassType } from '../components/Card'
import { getAllClassInfo, isAuthenticated } from '../api/api'
import clsx from 'clsx'

const values: ClassType[] = [
  {
    id: 1,
    turma: 1,
    discipline_name: 'Disciplina 1',
    period: '2023.1',
    local: 'Local 1',
    schedule: 'Horário 1',
    teacher_name: 'T',
  },
  {
    id: 2,
    turma: 1,
    discipline_name: 'Disciplina 1',
    period: '2023.1',
    local: 'Local 1',
    schedule: 'Horário 1',
    teacher_name: 'T',
  },
  {
    id: 3,
    turma: 1,
    discipline_name: 'Disciplina 1',
    period: '2023.1',
    local: 'Local 1',
    schedule: 'Horário 1',
    teacher_name: 'T',
  },
]

export default function Turmas() {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }
  })

  const [turmas, setTurmas] = useState<ClassType[]>([])
  useEffect(() => {
    getAllClassInfo()
      .then((data) => {
        setTurmas(data)
      })
      .catch(() => alert('Erro ao listar turmas do sistema'))
  }, [])
  return (
    <div className={clsx('grid gap-4 pb-4')}>
      <CardClass values={turmas ? turmas : values} />
    </div>
  )
}
