'use client'

import clsx from 'clsx'
import { Input } from '../../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Autocomplete } from '../../components/Autocomplete'
import { useEffect, useState } from 'react'
import { createTeacher, getAllDepartments } from '../../api/api'
import { TeacherType } from '../../utils/types'

export type DepartmentType = {
  id: number
  department_name: string
}

export function CreateTeacher() {
  const userFormDefaultValues: TeacherType = {
    name: '',
    department_code: 0,
  }

  const methods = useForm<TeacherType>({
    defaultValues: userFormDefaultValues,
  })

  const [departmentsData, setDepartments] = useState([])

  useEffect(() => {
    getAllDepartments()
      .then((data) => {
        const formattedData = data.map((item: DepartmentType) => ({
          id: item.id,
          label: item.department_name,
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
        <Input name="name" type="text" label={'Nome'} />
        <Autocomplete
          name="department_code"
          values={departmentsData}
          label={'Departamento'}
        />
        <Button style={'CREATE'} type="submit">Criar professor</Button>
      </form>
    </FormProvider>
  )
}
