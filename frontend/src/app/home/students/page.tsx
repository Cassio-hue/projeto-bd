'use client'
import clsx from 'clsx'
import StickyHeadTable, {
  StudentTableData,
} from '../../components/StudentTable'
import { useEffect, useState } from 'react'
import { deleteStudent, getAllStudents, updateStudent } from '../../api/api'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { StudentType } from '../../utils/types'
import { FormControlLabel, Radio } from '@mui/material'

export default function ListStudents() {
  const [students, setStudents] = useState<StudentTableData[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    getAllStudents()
      .then((res) => setStudents(res))
      .catch(() => alert('Erro ao listar professores do sistema'))
  }, [])

  const userFormDefaultValues: StudentType = {
    email: '',
    password: '',
    is_admin: undefined,
  }

  const methods = useForm<StudentType>({
    defaultValues: userFormDefaultValues,
  })

  const onSubmit = (data: StudentType) => {
    const email = data.email
    data.is_admin = isAdmin

    if (!email) {
      alert('Email não encontrado')
      return
    }

    updateStudent(data)
      .then((res) => {
        if (res.status === 200) {
          alert('Usuário atualizado com sucesso')
        }
      })
      .catch(() => {
        alert('Erro ao atualizar usuário')
      })
  }

  const deletePerfil = async (data: StudentType) => {
    const email = data.email

    if (!email) {
      alert('Email não encontrado')
      return
    }

    const res = await deleteStudent(email).catch(() => {
      alert('Erro ao deletar usuário')
    })

    if (res?.status === 200) {
      alert('Usuário deletado com sucesso')
    }
  }

  return (
    <div className={clsx('p-4 w-full flex')}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={clsx('flex flex-col gap-4 w-96 pb-12 pr-4')}
        >
          <Input name="email" type="email" label={'E-mail*'} />
          <Input name="password" type="password" label={'Senha'} />

          <div>
            <label>Admin</label>
            <div className={clsx('flex')}>
              <FormControlLabel
                control={
                  <Radio
                    checked={isAdmin === true}
                    onChange={() => setIsAdmin(true)}
                    value="true"
                  />
                }
                label="Sim"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={isAdmin === false}
                    onChange={() => setIsAdmin(false)}
                    value="false"
                  />
                }
                label="Não"
              />
            </div>
          </div>

          <div>
            <Button type="submit">Editar perfil</Button>
            <Button
              style={'DELETE'}
              onClick={() => {
                const values = methods.getValues()
                deletePerfil(values)
              }}
            >
              Deletar perfil
            </Button>
          </div>
        </form>
        {students.length > 0 ? <StickyHeadTable rows={students} /> : ''}
      </FormProvider>
    </div>
  )
}
