import { CreateTeacherType, UpdateTeacherType } from '../utils/types'

export const getAllDepartments = () => {
  return fetch('http://localhost:3333/departments')
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}

export const getAllTeachers = () => {
  return fetch('http://localhost:3333/teachers')
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}

export const createTeacher = (teacherData: CreateTeacherType) => {
  return fetch('http://localhost:3333/teachers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teacherData),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Erro de solicitação: ' + response.status)
      }
      return response
    })
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}

export const updateTeacher = (teacherData: UpdateTeacherType) => {
  const { id, ...updateTeacherData } = teacherData
  return fetch(`http://localhost:3333/teachers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateTeacherData),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Erro de solicitação: ' + response.status)
      }
      return response
    })
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}
