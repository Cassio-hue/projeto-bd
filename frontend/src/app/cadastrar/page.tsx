'use client'

import clsx from 'clsx'
import { Input } from '../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../components/Button'
import { signUp } from '../api/api'
import { StudentType } from '../utils/types'

export default function Cadastrar() {
  // Limpa o token do localstorage
  localStorage.clear()

  const userFormDefaultValues: StudentType = {
    student_id: '',
    name: '',
    email: '',
    password: '',
    is_admin: false,
  }

  const methods = useForm<StudentType>({
    defaultValues: userFormDefaultValues,
  })

  const onSubmit: SubmitHandler<StudentType> = async (data) => {
    const res = await signUp(data)
      .catch(() => {
        alert('Erro ao realizar cadastro do usuário')
      })
      .then((res) => res)

    if (res?.status === 201) {
      alert('Cadastro realizado com sucesso')
      window.location.href = '/'
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex flex-col gap-8 w-96')}
      >
        <Input name="student_id" type="text" label={'Matrícula'} />
        <Input name="name" type="text" label={'Nome'} />
        <Input name="email" type="email" label={'E-mail'} />
        <Input name="password" type="password" label={'Senha'} />
        <Button type="submit">Entrar</Button>
      </form>
    </FormProvider>
  )
}
