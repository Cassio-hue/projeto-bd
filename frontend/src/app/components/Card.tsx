import clsx from 'clsx'

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

export const CardClass = ({ values }: Props) => {
  return (
    <>
      {values.map((item) => (
        <div
          key={item.id}
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
