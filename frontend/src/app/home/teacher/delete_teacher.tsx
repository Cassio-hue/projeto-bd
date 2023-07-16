'use client'

import clsx from 'clsx'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Autocomplete } from '../../components/Autocomplete'
import { useEffect, useState } from 'react'
import { deleteTeacher, getAllTeachers, isAuthenticated } from '../../api/api'
import { TeacherType } from '../../utils/types'

export function DeleteTeacher() {
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

  const [teachersData, setTeachers] = useState([])

  useEffect(() => {
    getAllTeachers()
      .then((data) => {
        const formattedData = data.map((item: TeacherType) => ({
          id: item.id,
          label: item.name,
        }))
        setTeachers(formattedData)
      })
      .catch(() => alert('Erro ao listar professores'))
  }, [])

  const onSubmit: SubmitHandler<TeacherType> = async (data) => {
    try {
      await deleteTeacher(data)
      alert('Professor excluido com sucesso!')
    } catch (err) {
      alert('Ocorreu um erro ao excluir o professor')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex items-center flex-col gap-8 w-full')}
      >
        <h1 className="text-lg">Remover professor</h1>
        <Autocomplete name="id" values={teachersData} label={'Professor'} />
        <Button style='DELETE' type="submit">Excluir</Button>
      </form>
    </FormProvider>
  )
}
