import clsx from 'clsx'

export interface RatingInfoType {
  id: number
  score: number
  comment: string
  student_name: string
  discipline_name: string
}

export const Comment = ({ values }: { values: RatingInfoType[] }) => {
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
                className={clsx('flex justify-center items-center rounded-full bg-red-600 text-white w-12 p-2')}
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
