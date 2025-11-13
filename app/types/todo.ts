export type Todo = {
  id: number
  title: string
  completed: boolean
}

export type TodoFormData = {
  title: string
  completed: boolean
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}