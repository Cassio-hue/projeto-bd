'use client'

import { useEffect, useState } from 'react'
import {
  deleteRating,
  deleteReport,
  getRatingReports,
  isAuthenticated,
} from '../../api/api'
import clsx from 'clsx'
import { Button } from '../../components/Button'

// "rating_id": 1,
// "score": 4,
// "comment": "Banco de dadinho é pika",
// "report_id": 1,
// "report_count": 1,
// "student_name": "Admin",
// "teacher_name": "PEDRO GARCIA FREITAS"
interface RatingReports {
  rating_id: number
  score: number
  comment: string
  report_id: number
  report_count: number
  student_name: string
  teacher_name: string
}

export default function Reports() {
  const [reports, setReports] = useState<RatingReports[]>()

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }

    getRatingReports()
      .catch(() => alert('Erro ao listar relatórios'))
      .then((res) => setReports(res))
  }, [])

  const handleAccept = async (report_id: number) => {
    const res = await deleteReport(report_id)
      .catch(() => alert('Erro ao aceitar avaliação'))
      .then((res) => res)

    if (res) {
      const newReports = reports?.filter(
        (report) => report.report_id !== report_id
      )
      setReports(newReports)
      alert('Avaliação aceita com sucesso')
    }
  }

  const handleDelete = async (rating_id: number) => {
    const res = await deleteRating(rating_id)
      .catch(() => alert('Erro ao remover avaliação'))
      .then((res) => res)

    if (res) {
      const newReports = reports?.filter(
        (report) => report.rating_id !== rating_id
      )
      setReports(newReports)
      alert('Avaliação removida com sucesso')
    }
  }

  return (
    <>
      {reports ? (
        reports.map((report) => (
          <div
            className={clsx('w-1/2 flex flex-col border rounded-lg p-4 m-2')}
            key={report.report_id}
          >
            <span>
              <span className="font-bold">Estudante:</span>{' '}
              {report.student_name}
            </span>
            <span>
              <span className="font-bold">Professor:</span>{' '}
              {report.teacher_name}
            </span>
            <span>
              <span className="font-bold">Avaliação:</span> {report.score}
            </span>
            <span>
              <span className="font-bold">Comentário:</span> {report.comment}
            </span>
            <span>
              <span className="font-bold">Quantidade de denúncias:</span>{' '}
              {report.report_count}
            </span>
            <div className={clsx('flex my-3')}>
              <div className={clsx('w-full mr-3')}>
                <Button
                  style="CREATE"
                  onClick={() => handleAccept(report.report_id)}
                >
                  Aceitar avaliação
                </Button>
              </div>
              <Button
                style="DELETE"
                onClick={() => handleDelete(report.rating_id)}
              >
                Deletar avaliação
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h1>Sem denúncias ativas</h1>
      )}
    </>
  )
}
