'use client'

import { useEffect, useState } from 'react'
import { deleteRating, deleteReport, getRatingReports, isAuthenticated } from '../../api/api'
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
            className={clsx('w-1/2 flex flex-col border border-red-600 p-4')}
            key={report.report_id}
          >
            <span>Estudante: {report.student_name}</span>
            <span>Professor: {report.teacher_name}</span>
            <span>Avaliação: {report.score}</span>
            <span>Comentário: {report.comment}</span>
            <span>Quantidade de denúncias: {report.report_count}</span>
            <div className={clsx('flex')}>
              <Button style="CREATE" onClick={() => handleAccept(report.report_id)}>
                Aceitar avaliação
              </Button>
              <Button style="DELETE" onClick={() => handleDelete(report.rating_id)}>Deletar avaliação</Button>
            </div>
          </div>
        ))
      ) : (
        <h1>Sem denúncias ativas</h1>
      )}
    </>
  )
}
