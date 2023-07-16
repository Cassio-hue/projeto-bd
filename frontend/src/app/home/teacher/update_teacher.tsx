'use client'

import clsx from 'clsx'
import { Input } from '../../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Autocomplete, DataAutocomplete } from '../../components/Autocomplete'
import { useEffect, useState } from 'react'
import { updateTeacher, getAllDepartments, getAllTeachers, isAuthenticated } from '../../api/api'
import { TeacherType } from '../../utils/types'


export type DepartmentType = {
  id: number
  department_name: string
}

export function UpdateTeacher() {

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }
  }, [])

  const userFormDefaultValues: TeacherType = {
    name: '',
    department_code: 0,
  }

  const methods = useForm<TeacherType>({
    defaultValues: userFormDefaultValues,
  })

  const [departmentsData, setDepartments] = useState([])
  const [teachersData, setTeachers] = useState([])
  const [saveTeachersData, setSaveTeachers] = useState<TeacherType[]>([])

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

    getAllTeachers()
      .then((data) => {
        const formattedData = data.map((item: TeacherType) => ({
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
        (item: TeacherType) => item.id === selectedTeacher.id
      )

      if (teacher) {
        methods.reset({
          ...userFormDefaultValues,
          id: selectedTeacher.id,
          name: teacher.name,
          department_code: teacher.department_code,
        })
      }
    }
  }

  const onSubmit: SubmitHandler<TeacherType> = async (data) => {
    data.name = data.name?.toUpperCase()
    try {
      await updateTeacher(data)
      alert('Professor atualizado com sucesso!')
    } catch (err) {
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
        <Autocomplete
          name="department_code"
          values={departmentsData}
          label={'Departamento'}
        />
        <Button style={'UPDATE'} type="submit">Editar professor</Button>
      </form>
    </FormProvider>
  )
}
