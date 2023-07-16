import { useEffect, useState } from 'react'
import { ClassType } from '../utils/types'
import { deleteClass, getAllClassInfo } from '../api/api'
import { FormProvider, useForm } from 'react-hook-form'
import { Autocomplete } from '../components/Autocomplete'
import { Button } from '../components/Button'
import clsx from 'clsx'

export const DeleteClass = () => {
  const userFormDefaultValues: ClassType = {}

  const methods = useForm<ClassType>({
    defaultValues: userFormDefaultValues,
  })

  const [turmas, setTurmas] = useState([])

  useEffect(() => {
    getAllClassInfo()
      .then((data) => {
        const formattedData = data.map((item: ClassType) => ({
          id: item.id,
          label:
            item.discipline_name + ' - ' + item.period + ' - ' + item.schedule,
        }))
        setTurmas(formattedData)
      })
      .catch(() => alert('Erro ao listar turmas do sistema'))
  }, [])

  const onSubmit = async (data: ClassType) => {
    if (!data.id) return alert('Selecione uma turma')
    await deleteClass(data.id)
      .catch((res) => {
        console.log('Teve resposta?', res)
        alert('Erro ao deletar turma')
      })
      .then((res) => {
        console.log(res)
        res?.status === 200 && alert('Turma deletada com sucesso!')
      })
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex items-center flex-col gap-8 w-full')}
      >
        <h1 className="text-lg">Remover turma</h1>
        <Autocomplete name="id" values={turmas} label={'Turmas'} />
        <Button style="DELETE" type="submit">
          Excluir
        </Button>
      </form>
    </FormProvider>
  )
}
