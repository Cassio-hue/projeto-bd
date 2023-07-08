export type SignInType = {
  email: string
  password: string
}

export type DepartmentType = {
  department_code?: number
  department_name?: string
}

export type TeacherType = {
  id?: number
  name?: string
  department_code?: number
}

export type DisciplineType = {
  id?: number
  code?: number
  discipline_name?: string
  department_id?: number
  teacher_id?: number
}

export type ClassType = {
  id?: number
  turma?: number
  period?: string
  schedule?: string
  local?: string
  discipline_id?: number
  teacher_id?: number
}

export type StudentType = {
  student_id?: string
  name?: string
  email?: string
  password?: string
  is_admin?: boolean
}