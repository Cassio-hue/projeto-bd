import { CreateTeacher } from '../utils/types'

export const getAllDepartments = () => {
  return fetch('http://localhost:3333/departments')
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}

export const createTeacher = (teacherData: CreateTeacher) => {
  return fetch('http://localhost:3333/teachers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teacherData),
  })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error('Erro de solicitação: ' + response.status)
      }
      return response
    })
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}
