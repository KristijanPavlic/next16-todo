import { useState, useTransition, useEffectEvent } from "react"
import { Todo } from "../types/todo"
import { TodoService } from "../services/todoService"

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // React 19: useTransition for non-blocking state updates
  // Provides isPending state to show loading indicators during transitions
  const [isPending, startTransition] = useTransition()

  // React 19: useEffectEvent
  // Creates a stable function reference that doesn't change on every render
  // Unlike useCallback, it doesn't need a dependency array and always captures latest values
  const loadTodos = useEffectEvent(async () => {
    setIsLoading(true)
    setError(null)

    const result = await TodoService.fetchTodos() // default is 10 - set in todoService.ts
    
    if (result.success && result.data) {
      setTodos(result.data)
    } else {
      setError(result.error || "Unknown error occurred")
    }
    
    setIsLoading(false)
  })

  const addTodo = async (title: string): Promise<boolean> => {
    const trimmed = title.trim()

    if (!trimmed) {
      setError("Task title is required.")

      return false
    }

    if (trimmed.length < 3) {
      setError("Task title must be at least 3 characters long.")

      return false
    }

    setError(null)

    return new Promise((resolve) => {
      // React 19: Using startTransition for non-blocking updates
      // This marks the state update as a transition, keeping UI responsive
      startTransition(async () => {
        const result = await TodoService.createTodo({
          title: trimmed,
          completed: false
        })

        if (result.success && result.data) {
          setTodos((prev) => {
            const existingIds = new Set(prev.map(todo => todo.id))
            const newId = TodoService.generateUniqueId(existingIds, result.data?.id)

            return [
              {
                id: newId,
                title: trimmed,
                completed: false,
              },
              ...prev
            ]
          })

          resolve(true)
        } else {
          setError(result.error || "Unknown error occurred")
          resolve(false)
        }
      })
    })
  }

  const toggleTodo = (id: number) => {
    // React 19: Wrapping state updates in transitions for smooth UX
    startTransition(() => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      )
    })
  }

  const deleteTodo = (id: number) => {
    // React 19: Non-blocking delete operation using startTransition
    startTransition(() => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    })
  }

  return {
    todos,
    error,
    isLoading,
    isPending,
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearError: () => setError(null)
  }
}