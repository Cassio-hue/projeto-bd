import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { deleteRating, isAuthenticated, makeReport } from '../api/api'
import { ReportType } from '../utils/types'
import PencilIcon from '../utils/images/pen.svg'
import DeleteIcon from '../utils/images/lixeira.svg'
import Image from 'next/image'
import { Modal } from './Modal'
import { EditComment } from './EditComment'

export interface RatingInfoType {
  id: number
  score: number
  comment: string
  student_email: string
  student_name: string
  discipline_name: string
}

export const Comment = ({ values }: { values: RatingInfoType[] }) => {
  const [email, setEmail] = useState<string>()
  const [open, setOpen] = useState<boolean>(false)
  const [ratingId, setRatingId] = useState<number>(0)

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

  const handleDelete = async (id: number) => {
    deleteRating(id)
      .catch(() => {
        alert('Erro ao remover avaliação')
      })
      .then((res) => {
        if (res?.status === 200) {
          alert('Avaliação removida com sucesso')
        }
      })
  }

  return (
    <>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <EditComment rating_id={ratingId} />
      </Modal>
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
              <div className="flex justify-between items-center">
                <span
                  className={clsx(
                    'flex justify-center items-center rounded-full bg-red-600 text-white w-10 p-2 cursor-pointer'
                  )}
                  onClick={() => handleReport(value.id, email || '')}
                >
                  D
                </span>
                {value.student_email === email && (
                  <div className="flex items-center">
                    <Image
                      src={PencilIcon}
                      alt="editar-icon"
                      height={30}
                      width={30}
                      className="cursor-pointer pr-2"
                      onClick={() => {
                        setRatingId(value.id)
                        setOpen(true)
                      }}
                    />

                    <Image
                      src={DeleteIcon}
                      alt="apagar-icon"
                      height={30}
                      width={30}
                      className="cursor-pointer"
                      onClick={() => {
                        handleDelete(value.id)
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
