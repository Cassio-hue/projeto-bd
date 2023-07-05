import { CreateTeacher } from "../utils/types";

export const getAllDepartments = () => {
  return fetch('http://localhost:3333/departments')
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      console.log('Erro de solicitação', err)
      throw err
    })
}

export const createTeacher = (teacherData: CreateTeacher) => {
    return fetch('http://localhost:3333/teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teacherData)
    })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      console.log('Erro de solicitação', err);
      throw err;
    });
  };