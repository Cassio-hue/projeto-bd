import { TeacherType, SignInType, StudentType } from '../utils/types'

export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return true
  }
  return false
}

export const logout = () => {
  localStorage.clear()
  window.location.href = '/'
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const signIn = (data: SignInType) => {
  console.log(data)
  return fetch('http://localhost:3333/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Erro de solicitação: ' + response.status)
      }
      return response.json()
    })
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}

export const signUp = (data: StudentType) => {
  return fetch('http://localhost:3333/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error('Erro de solicitação: ' + response.status)
      }
      return response
    })
    .catch((err) => {
      throw err
    })
}

export const getAllClassInfo = () => {
  return fetch('http://localhost:3333/classes/complete-info', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Erro de solicitação: ' + response.status)
      }
      return response.json()
    })
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}

export const getAllDepartments = () => {
  return fetch('http://localhost:3333/departments')
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Erro de solicitação: ' + response.status)
      }
      return response.json()
    })
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}

export const getAllTeachers = () => {
  return fetch('http://localhost:3333/teachers')
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Erro de solicitação: ' + response.status)
      }
      return response.json()
    })
    .then((json) => json)
    .catch((err) => {
      throw err
    })
}

export const createTeacher = (teacherData: TeacherType) => {
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

export const updateTeacher = (teacherData: TeacherType) => {
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
