'use client'

import clsx from 'clsx'
import { Input } from '../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../components/Button'
import { signUp } from '../api/api'
import { StudentSignUpType } from '../utils/types'
import { useEffect, useState } from 'react'
import profileNoPic from '../utils/images/profile_no_pic.jpg'
import Image from 'next/image'

export default function Cadastrar() {
  useEffect(() => {
    // Limpa o token do localstorage
    localStorage.clear()
  })

  const userFormDefaultValues: StudentSignUpType = {
    student_id: '',
    name: '',
    email: '',
    password: '',
    is_admin: false,
    image: null,
  }

  const methods = useForm<StudentSignUpType>({
    defaultValues: userFormDefaultValues,
  })

  const [selectedFile, setSelectedFile] = useState(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const onSubmit: SubmitHandler<StudentSignUpType> = async (data) => {
    if (selectedFile) {
      data.image = selectedFile
    }

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
        className={clsx('flex flex-col gap-4 w-96 pb-12')}
      >
        <div className={clsx('flex flex-col justify-center items-center')}>
          <Image
            priority={true}
            className={clsx('rounded-full border border-orange-950')}
            src={
              selectedFile ? URL.createObjectURL(selectedFile) : profileNoPic
            }
            alt="Uploaded File"
            width={200}
            height={200}
          />
          {selectedFile ? (
            ''
          ) : (
            <span className={clsx('underline text-red-500')}>
              Selecione uma foto de perfil
            </span>
          )}
        </div>
        <input type="file" onChange={handleFileChange} />
        <Input name="student_id" type="text" label={'Matrícula'} />
        <Input name="name" type="text" label={'Nome'} />
        <Input name="email" type="email" label={'E-mail'} />
        <Input name="password" type="password" label={'Senha'} />
        <span className="cursor-pointer font-bold underline underline-offset-8" onClick={() => window.location.href = '/'}>
          Tela de login
        </span>
        <Button type="submit">Criar conta</Button>
      </form>
    </FormProvider>
  )
}
