import clsx from 'clsx'
import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'SIGAA 2',
  description:
    'Trabalho da disciplina Banco de Dados da Universidade de Brasília 2023.1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />

        <main
          className={clsx(
            'flex flex-col h-full my-auto justify-center items-center'
          )}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
