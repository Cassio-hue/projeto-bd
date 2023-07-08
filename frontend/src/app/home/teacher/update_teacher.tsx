'use client'

import clsx from 'clsx'
import { Input } from '../../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Autocomplete, DataAutocomplete } from '../../components/Autocomplete'
import { useEffect, useState } from 'react'
import { updateTeacher, getAllDepartments, getAllTeachers } from '../../api/api'
import { TeacherType } from '../../utils/types'

interface Department {
  id: number
  code: number
  departmentname: string
}

export interface Teacher {
  id: number
  teacherID: string
  name: string
  email: string
  password: string
  department_id: number
}

export function UpdateTeacher() {
  const userFormDefaultValues: TeacherType = {
    id: 0,
    name: '',
    email: '',
    password: '',
    department_id: 0,
  }

  const methods = useForm<TeacherType>({
    defaultValues: userFormDefaultValues,
  })

  const [departmentsData, setDepartments] = useState([])
  const [teachersData, setTeachers] = useState([])
  const [saveTeachersData, setSaveTeachers] = useState<Teacher[]>([])

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

    getAllTeachers()
      .then((data) => {
        const formattedData = data.map((item: Teacher) => ({
          id: item.id,
          label: item.name,
        }))
        setTeachers(formattedData)
        setSaveTeachers(data)
      })
      .catch(() => alert('Erro ao listar professores'))
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectTeacher: any = (
    selectedTeacher: DataAutocomplete | null
  ) => {
    if (selectedTeacher) {
      const teacher = saveTeachersData.find(
        (item: Teacher) => item.id === selectedTeacher.id
      )

      if (teacher) {
        methods.reset({
          ...userFormDefaultValues,
          id: selectedTeacher.id,
          name: teacher.name,
          email: teacher.email,
          password: teacher.password,
          department_id: teacher.department_id,
        })
      }
    }
  }

  const onSubmit: SubmitHandler<TeacherType> = async (data) => {
    try {
      await updateTeacher(data)
      alert('Professor atualizado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Ocorreu um erro ao editar o professor')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex items-center flex-col gap-8 w-full')}
      >
        <h1 className="text-lg">Modificar professor</h1>
        <Autocomplete
          name="id"
          values={teachersData}
          label={'Professor'}
          onSelect={handleSelectTeacher}
        />
        <Input name="name" type="text" label={'Nome'} />
        <Input name="email" type="email" label={'E-mail'} />
        <Input name="password" type="password" label={'Senha'} />
        <Autocomplete
          name="department_id"
          values={departmentsData}
          label={'Departamento'}
        />
        <Button type="submit">Editar professor</Button>
      </form>
    </FormProvider>
  )
}
