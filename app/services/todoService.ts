import { Todo, TodoFormData, ApiResponse } from "../types/todo"

const API_URL = "https://jsonplaceholder.typicode.com/todos"

export class TodoService {
  static async fetchTodos(limit = 10): Promise<ApiResponse<Todo[]>> {
    const response = await fetch(`${API_URL}?_limit=${limit}`)
    
    if (response.status === 200) {
      const data = (await response.json()) as Todo[]

      return { success: true, data }
    }
    
    console.error("TodoService.fetchTodos: HTTP", response.status)
    
    if (response.status === 404)
      return { success: false, error: "Todos not found." }

    if (response.status === 500)
      return { success: false, error: "Server error occurred." }

    if (response.status >= 400 && response.status < 500)
      return { success: false, error: "Bad request. Please check your input." }

    return { success: false, error: "Failed to fetch todos. Please try again." }
  }

  static async createTodo(todoData: TodoFormData): Promise<ApiResponse<Partial<Todo>>> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData)
    })

    if (response.status === 201 || response.status === 200) {
      const data = (await response.json()) as Partial<Todo>

      return { success: true, data }
    }

    console.error("TodoService.createTodo: HTTP", response.status)
    
    if (response.status === 400)
        return { success: false, error: "Invalid todo data provided." }

    if (response.status === 401)
      return { success: false, error: "Unauthorized to create todo." }
    
    if (response.status === 403)
      return { success: false, error: "Permission denied to create todo." }
    
    if (response.status === 500)
      return { success: false, error: "Server error occurred while creating todo." }
    
    if (response.status >= 400 && response.status < 500)
      return { success: false, error: "Bad request. Please check your input." }
    
    return { success: false, error: "Failed to create todo. Please try again." }
  }

  static generateUniqueId(existingIds: Set<number>, fallbackId?: number): number {
    let newId = fallbackId ?? Date.now()

    while (existingIds.has(newId)) {
      newId = Date.now() + Math.floor(Math.random() * 1000)
    }

    return newId
  }
}