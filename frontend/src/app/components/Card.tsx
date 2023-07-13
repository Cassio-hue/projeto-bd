import clsx from 'clsx'
import { Input } from './Input'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from './Button'
import { useEffect, useState } from 'react'
import { Modal } from './Modal'
import { Rating } from '@mui/material'
import { createRating, getAllRatings } from '../api/api'
import { RatingType } from '../utils/types'
import { Comment, RatingInfoType } from './Comment'
export interface ClassType {
  id: number
  turma: number
  period: string
  schedule: string
  local: string
  discipline_name: string
  teacher_name: string
}

interface Props {
  values: ClassType[]
}

interface RatingComponentProps {
  values: ClassType | undefined
}

const RatingComponent = ({ values }: RatingComponentProps) => {
  const [rating, setRating] = useState<RatingInfoType[]>()

  const userFormDefaultValues: RatingType = {
    student_email: '',
    comment: '',
    class_id: 0,
    score: 0,
  }

  const methods = useForm<RatingType>({
    defaultValues: userFormDefaultValues,
  })

  useEffect(() => {
    methods.setValue('student_email', localStorage.getItem('email'))
    methods.setValue('class_id', values?.id)

    getAllRatings()
      .then((res) => {
        const filteredRatings = res.filter((rating: RatingType) => rating.class_id === values?.id)
        setRating(filteredRatings)
      })
      .catch(() => alert('Erro ao listar avaliações'))
  }, [])

  
  const onSubmit: SubmitHandler<RatingType> = async (data) => {
    const res = await createRating(data)
      .catch(() => {
        alert('Erro ao criar avaliação')
      })
      .then((res) => res)

    if (res?.status === 201) {
      alert('Avaliação criada com sucesso')
    }
  }

  return (
    <>
      {rating && <Comment values={rating} />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="comment"
            type="text"
            label={'Comentário'}
            placeholder="Digite aqui seu comentário"
            multiline
            rows={4}
          />
          <Rating
            name="score"
            value={methods.watch('score')}
            onChange={(event, newValue) => {
              methods.setValue('score', newValue ? newValue : 0)
            }}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </FormProvider>
    </>
  )
}

export const CardClass = ({ values }: Props) => {
  const [rating, setRating] = useState(false)
  const [classUnB, setClass] = useState<ClassType>()

  return (
    <>
      <Modal open={rating} handleClose={() => setRating(false)}>
        {classUnB ? (
          <RatingComponent values={classUnB} />
        ) : (
          <div>Erro ao renderizar</div>
        )}
      </Modal>
      {values.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            setClass(item)
            setRating(true)
          }}
          className={clsx(
            'flex flex-col bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl w-full p-1 m-3'
          )}
        >
          <div
            className={clsx(
              'flex flex-col rounded-2xl p-5 bg-black text-white'
            )}
          >
            <h1 className={clsx('text-2xl mb-4')}>{item.discipline_name}</h1>
            <span className={clsx('font-bold')}>
              Periodo:
              <span className={clsx('font-normal ml-2')}>{item.period}</span>
            </span>
            <span className={clsx('font-bold')}>
              Horário:
              <span className={clsx('font-normal ml-2')}>{item.schedule}</span>
            </span>
            <span className={clsx('font-bold')}>
              Professor:
              <span className={clsx('font-normal ml-2')}>
                {item.teacher_name}
              </span>
            </span>
            <span className={clsx('font-bold')}>
              Local:
              <span className={clsx('font-normal ml-2')}>{item.local}</span>
            </span>
          </div>
        </div>
      ))}
    </>
  )
}
