'use client'

import clsx from 'clsx'
import { Input } from '../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../components/Button'
import { getStudentData, isAuthenticated } from '../api/api'
import { StudentType } from '../utils/types'
import { useEffect, useState } from 'react'
import profileNoPic from '../utils/images/profile_no_pic.jpg'
import Image from 'next/image'

export default function Perfil() {
  const [studentData, setStudentData] = useState<StudentType>()
    const [src, setSrc] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/'
    }

    const email = localStorage.getItem('email')
    if (email)
      getStudentData(email)
        .then((data) => setStudentData(data))
        .catch(() => alert('Erro ao listar departamentos'))
  }, [])

  const userFormDefaultValues: StudentType = {
    name: studentData?.name || '',
    email: studentData?.email || '',
    password: '',
    picture: null,
  }

  useEffect(() => {
    if (studentData?.picture) {
      const profilePicture = studentData.picture.data
      const image = Buffer.from(profilePicture);
      const base64String = image.toString('base64');
      const src = `data:image/jpeg;base64,${base64String}`;
      setSrc(src);
    }
  }, [studentData]);

  const methods = useForm<StudentType>({
    defaultValues: userFormDefaultValues,
  })

  const [selectedFile, setSelectedFile] = useState(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const onSubmit: SubmitHandler<StudentType> = async (data) => {
    // Se um arquivo foi selecionado, adicione-o ao objeto de dados
    if (selectedFile) {
      data.picture = selectedFile
    }

    // const res = await updateStudent(data)
    //   .catch(() => {
    //     alert('Erro ao realizar cadastro do usuário')
    //   })
    //   .then((res) => res)

    // if (res?.status === 201) {
    //   alert('Cadastro realizado com sucesso')
    //   window.location.href = '/'
    // }
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx('flex flex-col gap-8 w-96')}
      >
        <div className={clsx('flex flex-col justify-center items-center')}>
          <Image
            priority={true}
            className={clsx('rounded-full border border-orange-950')}
            src={src || profileNoPic}
            alt="Uploaded File"
            width={200}
            height={200}
          />
          {selectedFile ? (
            ''
          ) : (
            <span className={clsx('underline text-yellow-400')}>
              Selecione uma foto de perfil
            </span>
          )}
        </div>
        <input type="file" onChange={handleFileChange} />
        <Input name="student_id" type="text" label={'Matrícula'} />
        <Input name="name" type="text" label={'Nome'} />
        <Input name="email" type="email" label={'E-mail'} />
        <Input name="password" type="password" label={'Senha'} />
        <Button type="submit">Editar perfil</Button>
      </form>
    </FormProvider>
  )
}
