import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { isAuthenticated, makeReport } from '../api/api'
import { ReportType } from '../utils/types'

export interface RatingInfoType {
  id: number
  score: number
  comment: string
  student_name: string
  discipline_name: string
}

export const Comment = ({ values }: { values: RatingInfoType[] }) => {
  const [email, setEmail] = useState<string>()

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }

    const email = localStorage.getItem('email')
    setEmail(email || '')
  }, [])

  const handleReport = async (id: number, email: string) => {
    const data: ReportType = {
      rating_id: id,
      student_email: email,
    }

    const res = await makeReport(data)
      .catch(() => alert('Erro ao reportar avaliação'))
      .then((res) => res)

    res && alert('Avaliação reportada com sucesso')
  }

  return (
    <>
      {values?.length === 0 ? (
        <span className="mb-4">Nenhuma avaliação encontrada</span>
      ) : (
        <div>
          <h1>{values[0].discipline_name}</h1>
          {values.map((value) => (
            <div
              className={clsx(
                'flex flex-col my-2 border border-sky-800 rounded-md p-2'
              )}
              key={value.id}
            >
              <span>Estudante: {value.student_name}</span>
              <span>Avaliação: {value.score}</span>
              <span>Comentário: {value.comment}</span>
              <span
                className={clsx(
                  'flex justify-center items-center rounded-full bg-red-600 text-white w-10 p-2 cursor-pointer'
                )}
                onClick={() => handleReport(value.id, email || '')}
              >
                D
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
