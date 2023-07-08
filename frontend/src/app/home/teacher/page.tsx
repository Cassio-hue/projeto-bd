'use client'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { CreateTeacher } from './create_teacher'
import clsx from 'clsx'
import { UpdateTeacher } from './update_teacher'

export default function CRUDTeacher() {
  const [openCreate, setCreateOpen] = useState(false)
  const [openUpdate, setUpdateOpen] = useState(false)
  return (
    <div className={clsx('flex flex-col gap-8')}>
      <Modal open={openCreate} handleClose={() => setCreateOpen(false)}>
        <CreateTeacher />
      </Modal>
      <Modal open={openUpdate} handleClose={() => setUpdateOpen(false)}>
        <UpdateTeacher />
      </Modal>
      <Button onClick={() => setCreateOpen(true)}>Cadastrar professor</Button>
      <Button onClick={() => setUpdateOpen(true)}>Editar professor</Button>
    </div>
  )
}
