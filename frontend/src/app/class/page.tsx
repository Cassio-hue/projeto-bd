'use client'

import { useEffect, useState } from 'react'
import { CardClass, ClassType } from '../components/Card'
import { getAllClassInfo, isAuthenticated } from '../api/api'
import clsx from 'clsx'

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
      <CardClass values={turmas} />
    </div>
  )
}
