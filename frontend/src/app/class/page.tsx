'use client'

import { useEffect, useState } from 'react'
import { CardClass, ClassType } from '../components/Card'
import { getAllClassInfo, isAuthenticated } from '../api/api'
import clsx from 'clsx'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { CreateClass } from './create_class'
import { DeleteClass } from './delete_class'

export default function Turmas() {
  const [admin, setAdmin] = useState<boolean>(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }
    if (localStorage.getItem('admin') === 'false') {
      setAdmin(false)
    } else {
      setAdmin(true)
    }
  }, [])

  const [turmas, setTurmas] = useState<ClassType[]>([])
  const [openCreate, setCreateOpen] = useState(false)
  const [openDelete, setDeleteOpen] = useState(false)

  useEffect(() => {
    getAllClassInfo()
      .then((data) => {
        setTurmas(data)
      })
      .catch(() => alert('Erro ao listar turmas do sistema'))
  }, [])
  return (
    <>
      {admin ? (
        <>
          <Modal open={openCreate} handleClose={() => setCreateOpen(false)}>
            <CreateClass />
          </Modal>
          <Modal open={openDelete} handleClose={() => setDeleteOpen(false)}>
            <DeleteClass />
          </Modal>

          <div className="flex flex-col justify-center items-center w-96 gap-6 m-auto pb-10">
            <Button style={'CREATE'} onClick={() => setCreateOpen(true)}>
              Cadastrar turma
            </Button>
            <Button
              style={'DELETE'}
              onClick={() => setDeleteOpen(true)}
            >
              Deletar turma
            </Button>
          </div>
        </>
      ) : (
        ''
      )}

      <div className={clsx('grid gap-4 pb-4')}>
        <CardClass values={turmas} />
      </div>
    </>
  )
}
