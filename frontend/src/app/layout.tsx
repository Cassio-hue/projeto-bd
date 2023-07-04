import clsx from 'clsx'
import './globals.css'

export const metadata = {
  title: 'SIGAA 2',
  description: 'Trabalho da disciplina Banco de Dados da Universidade de Brasília 2023.1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={clsx("flex flex-col h-screen justify-center items-center m-auto")}>{children}</body>
    </html>
  )
}
