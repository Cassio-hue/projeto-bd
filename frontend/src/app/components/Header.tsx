import clsx from 'clsx'
import { NavOption } from './NavOption'

export default function Header() {
  return (
    <header className="flex items-center h-12 w-full bg-slate-700 text-white">
      <nav className={clsx('flex w-full justify-center')}>
        <NavOption to="/home">
          Home
        </NavOption>
        <NavOption to="/turmas">
          Turmas
        </NavOption>
        <NavOption to="/perfil">
          Perfil
        </NavOption>
      </nav>
    </header>
  )
}
