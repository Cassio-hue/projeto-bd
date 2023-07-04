'use client'

import clsx from 'clsx'
import { Input } from '../components/Input'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '../components/Button'

interface DataType {
  email: string
  senha: string
}

export default function Login() {

  const userFormDefaultValues: DataType = {
    email: '',
    senha: ''
  };

  const methods = useForm<DataType>({
    defaultValues: userFormDefaultValues,
  });


  const onSubmit: SubmitHandler<DataType> = (data) => console.log(data)
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={clsx('flex flex-col gap-8')}>
        <Input
          name="email"
          type="email"
          label={'E-mail'}
        />
        <Input
          name="password"
          type="password"
          label={'Senha'}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </FormProvider>
  )
}
