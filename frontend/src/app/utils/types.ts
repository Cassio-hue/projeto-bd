export type CreateTeacherType = {
  teacherID: string
  name: string
  email: string
  password: string
  department_id: number
}

export type UpdateTeacherType = {
  id: number
  name: string
  email: string
  password: string
  department_id: number
}
