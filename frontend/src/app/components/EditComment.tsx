import { FormProvider, useForm } from 'react-hook-form'
import { Input } from './Input'
import { Rating } from '@mui/material'
import { Button } from './Button'
import { RatingType } from '../utils/types'
import { useEffect } from 'react'
import { getRating, updateRating } from '../api/api'

interface Props {
  rating_id: number
}

export const EditComment = ({ rating_id }: Props) => {
  const userFormDefaultValues: RatingType = {
    id: 0,
    student_email: '',
    comment: '',
    class_id: 0,
    score: 0,
  }

  const methods = useForm<RatingType>({
    defaultValues: userFormDefaultValues,
  })

  useEffect(() => {
    getRating(rating_id)
      .catch(() => alert('Erro ao buscar avaliação'))
      .then((res) => {
        methods.setValue('id', res?.id)
        methods.setValue('comment', res?.comment)
        methods.setValue('score', res?.score)
      })
  }, [rating_id, methods])

  const onSubmit = async (data: RatingType) => {
    if (data.score === 0 || undefined) {
      alert('Avaliação inválida')
      return
    }
    updateRating(data)
      .catch(() => alert('Erro ao atualizar avaliação'))
      .then((res) => {
        if (res?.status === 200) {
          alert('Avaliação atualizada com sucesso')
        }
      })
  }

  return (
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
        <Button style="UPDATE" type="submit">
          Editar comentário
        </Button>
      </form>
    </FormProvider>
  )
}
