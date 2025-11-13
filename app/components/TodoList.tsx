import { Todo } from "../types/todo"
import { TodoItem } from "./TodoItem"

interface TodoListProps {
  todos: Todo[]
  isLoading: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoList({ todos, isLoading, onToggle, onDelete }: TodoListProps) {
  if (isLoading) {
    return (
      <ul className="space-y-2 max-h-[500px] overflow-y-auto pr-1 select-none">
        <li className="text-sm text-slate-400">
            Loading todos
        </li>
      </ul>
    )
  }

  if (todos.length === 0) {
    return (
      <ul className="space-y-2 max-h-[500px] overflow-y-auto pr-1 select-none">
        <li className="text-sm text-slate-400">
          No tasks. Add the first one above.
        </li>
      </ul>
    )
  }

  return (
    <ul className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}