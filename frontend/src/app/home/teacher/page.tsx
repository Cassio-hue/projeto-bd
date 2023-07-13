'use client'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { CreateTeacher } from './create_teacher'
import clsx from 'clsx'
import { UpdateTeacher } from './update_teacher'
import { DeleteTeacher } from './delete_teacher'
import { isAuthenticated } from '../../api/api'

export default function CRUDTeacher() {

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }
    if(localStorage.getItem('admin') === 'false'){
      window.location.href = '/home'
    }
  })

  const [openCreate, setCreateOpen] = useState(false)
  const [openUpdate, setUpdateOpen] = useState(false)
  const [openDelete, setDeleteOpen] = useState(false)

  return (
    <div className={clsx('flex flex-col gap-8')}>
      <Modal open={openCreate} handleClose={() => setCreateOpen(false)}>
        <CreateTeacher />
      </Modal>
      <Modal open={openUpdate} handleClose={() => setUpdateOpen(false)}>
        <UpdateTeacher />
      </Modal>
      <Modal open={openDelete} handleClose={() => setDeleteOpen(false)}>
        <DeleteTeacher />
      </Modal>

      <Button style={'CREATE'} onClick={() => setCreateOpen(true)}>
        Cadastrar professor
      </Button>
      <Button style={'UPDATE'} onClick={() => setUpdateOpen(true)}>
        Editar professor
      </Button>
      <Button style={'DELETE'} onClick={() => setDeleteOpen(true)}>
        Deletar professor
      </Button>
      <Button style={'LIST'} onClick={() => window.location.href = '/home/teacher/list-teachers'}>Listar professores</Button>
    </div>
  )
}
