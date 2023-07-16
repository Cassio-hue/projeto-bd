'use client'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { CreateTeacher } from './create_teacher'
import clsx from 'clsx'
import { UpdateTeacher } from './update_teacher'
import { DeleteTeacher } from './delete_teacher'
import { getAllTeachers, isAuthenticated } from '../../api/api'
import StickyHeadTable, {
  TeacherTableData,
} from '../../components/TeacherTable'

export default function CRUDTeacher() {
  const [teachers, setTeachers] = useState<TeacherTableData[]>([])

  const [openCreate, setCreateOpen] = useState(false)
  const [openUpdate, setUpdateOpen] = useState(false)
  const [openDelete, setDeleteOpen] = useState(false)
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }
    if (localStorage.getItem('admin') === 'false') {
      window.location.href = '/home'
    }

    getAllTeachers()
      .then((res) => setTeachers(res))
      .catch(() => alert('Erro ao listar professores do sistema'))
  }, [])

  return (
    <>
      <Modal open={openCreate} handleClose={() => setCreateOpen(false)}>
        <CreateTeacher />
      </Modal>
      <Modal open={openUpdate} handleClose={() => setUpdateOpen(false)}>
        <UpdateTeacher />
      </Modal>
      <Modal open={openDelete} handleClose={() => setDeleteOpen(false)}>
        <DeleteTeacher />
      </Modal>

      <div className={clsx('flex p-4 w-full')}>
        <div className='flex flex-col gap-6 w-96 pr-4'>
          <Button style={'CREATE'} onClick={() => setCreateOpen(true)}>
            Cadastrar professor
          </Button>
          <Button style={'UPDATE'} onClick={() => setUpdateOpen(true)}>
            Editar professor
          </Button>
          <Button style={'DELETE'} onClick={() => setDeleteOpen(true)}>
            Deletar professor
          </Button>
        </div>
        <div className={clsx('flex flex-col gap-8')}></div>
        {teachers.length > 0 ? <StickyHeadTable rows={teachers} /> : ''}
      </div>
    </>
  )
}
