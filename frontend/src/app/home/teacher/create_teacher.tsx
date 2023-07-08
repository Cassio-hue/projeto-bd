'use client'

import clsx from 'clsx'
import { Input } from '../../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Autocomplete } from '../../components/Autocomplete'
import { useEffect, useState } from 'react'
import { createTeacher, getAllDepartments } from '../../api/api'
import { TeacherType } from '../../utils/types'

interface Department {
  id: number
  code: number
  departmentname: string
}

export function CreateTeacher() {
  const userFormDefaultValues: TeacherType = {
    teacherID: '',
    name: '',
    email: '',
    password: '',
    department_id: 0,
  }

  const methods = useForm<TeacherType>({
    defaultValues: userFormDefaultValues,
  })

  const [departmentsData, setDepartments] = useState([])

  useEffect(() => {
    getAllDepartments()
      .then((data) => {
        const formattedData = data.map((item: Department) => ({
          id: item.id,
          label: item.departmentname,
        }))
        setDepartments(formattedData)
      })
      .catch(() => alert('Erro ao listar departamentos'))
  }, [])

  const onSubmit: SubmitHandler<TeacherType> = async (data) => {
    try {
      await createTeacher(data)
      alert('Professor criado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Ocorreu um erro ao criar o professor')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex items-center flex-col gap-8 w-full')}
      >
        <h1 className="text-lg">Cadastrar professor</h1>
        <Input name="teacherID" type="text" label={'Matrícula'} />
        <Input name="name" type="text" label={'Nome'} />
        <Input name="email" type="email" label={'E-mail'} />
        <Input name="password" type="password" label={'Senha'} />
        <Autocomplete
          name="department_id"
          values={departmentsData}
          label={'Departamento'}
        />
        <Button type="submit">Criar professor</Button>
      </form>
    </FormProvider>
  )
}
