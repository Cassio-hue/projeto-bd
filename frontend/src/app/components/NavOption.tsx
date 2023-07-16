'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavOptionProps {
  to: string
  children: React.ReactNode
}

export function NavOption({ to, children }: NavOptionProps) {
  const pathname = usePathname()
  
  const isActive = pathname === to

  const navOptionClasses = isActive ? 'underline underline-offset-8' : ''

  return (
    <Link href={to}>
      <span className={`p-4 ${navOptionClasses}`}>{children}</span>
    </Link>
  )
}
