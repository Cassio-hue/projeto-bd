'use client'

import clsx from 'clsx'
import { NavOption } from './NavOption'
import { logout } from '../api/api'

export default function Header() {
  return (
    <header className="flex items-center h-12 w-full bg-slate-700 text-white mb-24">
      <nav className={clsx('flex w-full justify-center')}>
        <div>
          <NavOption to="/home">Home</NavOption>
          <NavOption to="/turmas">Turmas</NavOption>
          <NavOption to="/perfil">Perfil</NavOption>
          <span
            className="ml-4 text-red-600 cursor-pointer"
            onClick={() => {
              logout()
            }}
          >
            Sair
          </span>
        </div>
      </nav>
    </header>
  )
}
