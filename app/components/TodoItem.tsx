import { Todo } from "../types/todo"
import { Check, Trash } from "lucide-react"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      key={todo.id}
      className="group flex items-center gap-3 rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2"
    >
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className="size-4 shrink-0 rounded border border-slate-500 flex items-center justify-center text-sm bg-slate-950 select-none hover:bg-slate-900 hover:cursor-pointer transition-colors duration-300 ease-in-out"
        aria-label="Change status"
      >
        {todo.completed && <Check className="size-2.5 shrink-0" />}
      </button>
      <span
        className={`flex-1 text-sm ${
          todo.completed
            ? "line-through text-slate-500"
            : "text-slate-100"
        }`}
      >
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-xs text-rose-400 hover:text-rose-300 select-none hover:cursor-pointer transition-all duration-300 ease-in-out"
      >
        <Trash className="size-4 shrink-0" />
      </button>
    </li>
  )
}