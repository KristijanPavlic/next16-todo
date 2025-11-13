import { Plus } from "lucide-react"
import { useState, FormEvent } from "react"

interface TodoFormProps {
  onSubmit: (title: string) => Promise<boolean>
  isPending: boolean
  error: string | null
}

export function TodoForm({ onSubmit, isPending, error }: TodoFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const success = await onSubmit(title)

    if (success) setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-3 select-none">
      <div className="flex-1 space-y-1">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full rounded-xl bg-slate-900/70 border border-slate-600 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
        />
        {error && (
          <span className="ml-1.5 text-xs text-rose-300">{error}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="whitespace-nowrap flex items-center justify-center rounded-xl bg-sky-500 min-h-9 px-4 py-2 h-fit w-fit md:min-w-24 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer transition-colors duration-300 ease-in-out"
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="size-4 shrink-0 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <span className="hidden md:flex">Add Task</span> <Plus className="size-4 shrink-0" />
          </div>
        )}
      </button>
    </form>
  )
}