'use client'

import clsx from 'clsx'
import { Input } from './components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from './components/Button'
import { isAuthenticated, signIn } from './api/api'
import { SignInType } from './utils/types'
import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    // Limpa o token do localstorage
    localStorage.clear()
  })

  const userFormDefaultValues: SignInType = {
    email: '',
    password: '',
  }

  const methods = useForm<SignInType>({
    defaultValues: userFormDefaultValues,
  })

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    const token = await signIn(data).catch(() => {
      alert('Erro ao realizar autenticação')
    })

    localStorage.setItem('token', token.token)
    localStorage.setItem('email', data.email)

    setTimeout(() => {
      if (isAuthenticated()) {
        alert('Login realizado com sucesso')
        window.location.href = '/home'
      }
    }, 500)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex flex-col gap-4 w-96 mt-')}
      >
        <Input name="email" type="email" label={'E-mail*'} />
        <Input name="password" type="password" label={'Senha*'} />
        <span
          className="cursor-pointer font-bold underline underline-offset-8"
          onClick={() => (window.location.href = '/cadastrar')}
        >
          Cadastrar conta
        </span>
        <Button type="submit">Entrar</Button>
      </form>
    </FormProvider>
  )
}
