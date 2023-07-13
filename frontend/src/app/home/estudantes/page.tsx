'use client'
import clsx from 'clsx'
import StickyHeadTable from '../../components/Table'

export default function Home() {
  return (
    <div className={clsx('w-3/4')}>
      <StickyHeadTable />
    </div>
  )
}
