import { FormProvider, useForm } from 'react-hook-form'
import { ClassType, DisciplineType, TeacherType } from '../utils/types'
import clsx from 'clsx'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Autocomplete } from '../components/Autocomplete'
import { useEffect, useState } from 'react'
import { createClass, getAllDisciplines, getAllTeachers } from '../api/api'

export const CreateClass = () => {
  const userFormDefaultValues: ClassType = {
    turma: 0,
    local: '',
    discipline_id: '',
    period: '',
    schedule: '',
    teacher_id: undefined,
  }
  const methods = useForm<ClassType>({
    defaultValues: userFormDefaultValues,
  })

  const [teachersData, setTeachers] = useState([])
  const [disciplinesData, setDisciplines] = useState([])

  useEffect(() => {
    getAllTeachers()
      .then((data) => {
        const formattedData = data.map((item: TeacherType) => ({
          id: item.id,
          label: item.name,
        }))
        setTeachers(formattedData)
      })
      .catch(() => alert('Erro ao listar departamentos'))

    getAllDisciplines().then((data) => {
      const formattedData = data.map((item: DisciplineType) => ({
        id: item.id,
        label: item.discipline_name,
      }))
      setDisciplines(formattedData)
    })
  }, [])

  const onSubmit = async (data: ClassType) => {
    data.turma = Number(data.turma)
    await createClass(data)
      .catch(() => alert('Erro ao criar turma'))
      .then((res) => res?.status === 201 && alert('Turma criada com sucesso!'))
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex items-center flex-col gap-8 w-full')}
      >
        <h1 className="text-lg">Criar turma</h1>
        <Input name="turma" type="number" label={'Turma*'} />
        <Input name="local" type="text" label={'Local*'} />
        <Input name="period" type="text" label={'Período*'} />
        <Input name="schedule" type="text" label={'Horário*'} />
        <Autocomplete
          name="discipline_id"
          values={disciplinesData}
          label={'Disciplina*'}
        />
        <Autocomplete
          name="teacher_id"
          values={teachersData}
          label={'Professor*'}
        />

        <Button style={'CREATE'} type="submit">
          Criar turma
        </Button>
      </form>
    </FormProvider>
  )
}
