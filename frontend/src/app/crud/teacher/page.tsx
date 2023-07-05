'use client'

import clsx from 'clsx'
import { Input } from '../../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Autocomplete } from '../../components/Autocomplete'
import { useEffect, useState } from 'react'
import { createTeacher, getAllDepartments } from '../../api/api'
import { CreateTeacher } from '../../utils/types'

interface Department {
  id: number
  code: number
  departmentname: string
}

export default function Login() {
  const userFormDefaultValues: CreateTeacher = {
    teacherID: '',
    name: '',
    email: '',
    password: '',
    department_id: 0,
  }

  const methods = useForm<CreateTeacher>({
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
      .catch((err) => console.log('Erro ao buscar departamentos', err))
  }, [])

  const onSubmit: SubmitHandler<CreateTeacher> = async (data) => {
    console.log(data)
    try {
      await createTeacher(data)
      // Sucesso: fazer algo após a criação do professor
      console.log('Professor criado com sucesso!')
    } catch (err) {
      // Erro: lidar com o erro de criação do professor
      console.log('Erro ao criar o professor', err)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex items-center flex-col gap-8 w-2/6')}
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
