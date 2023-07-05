export const getAllDepartments = () => {
  return fetch('http://localhost:3333/departments')
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      console.log('Erro de solicitação', err)
      throw err
    })
}
