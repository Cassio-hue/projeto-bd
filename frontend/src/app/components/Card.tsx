import clsx from 'clsx'

export interface CardProps {
    discipline: string;
    department: string;
    period: string;
    teacher: string;
  }
  
interface Props {
  values: CardProps[];
}

export const Card = ({ values }: Props) => {
  return (
    <div className={clsx('flex flex-col items-center justify-center m-auto w-full h-[90%] overflow-auto')}>
      {values.map((item, idx) => (
        <div
          key={idx}
          className={clsx(
            'flex flex-col bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl w-1/2 p-1 m-3 first-of-type:mt-36'
          )}
        >
          <div className={clsx('flex flex-col rounded-2xl p-5 bg-black text-white')}>
            <h1 className={clsx('text-2xl mb-4')}>{item.discipline}</h1>
            <span className={clsx('font-bold')}>
              Departamento:
              <span className={clsx('font-normal ml-2')}>{item.department}</span>
            </span>
            <span className={clsx('font-bold')}>
              Periodo:
              <span className={clsx('font-normal ml-2')}>{item.period}</span>
            </span>
            <span className={clsx('font-bold')}>
              Professor:
              <span className={clsx('font-normal ml-2')}>{item.teacher}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
