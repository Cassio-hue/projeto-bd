'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavOptionProps {
  to: string
  children: React.ReactNode
}

export function NavOption({ to, children }: NavOptionProps) {
  const pathname = usePathname()

  // Verifica se a localização atual corresponde ao caminho fornecido
  const isActive = pathname === to

  // Define as classes CSS condicionalmente usando o Tailwind CSS
  const navOptionClasses = isActive ? 'underline underline-offset-8' : ''

  return (
    <Link href={to}>
      <span className={`p-4 ${navOptionClasses}`}>{children}</span>
    </Link>
  )
}
