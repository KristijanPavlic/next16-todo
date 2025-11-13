"use client"

import { useEffect } from "react"
import { useTodos } from "./hooks/useTodos"
import { TodoForm } from "./components/TodoForm"
import { TodoList } from "./components/TodoList"

export default function HomePage() {
  const {
    todos,
    error,
    isLoading,
    isPending, // React 19: isPending from useTransition for loading states
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo
  } = useTodos()

  // Load todos on mount - SPA style approach
  // Using useEffectEvent in the hook ensures stable reference
  useEffect(() => {
    loadTodos() // This function is stable thanks to useEffectEvent
  }, []) // Empty dependency array is safe with useEffectEvent

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6">
        <header className="space-y-1 select-none">
          <h1 className="text-3xl font-semibold tracking-tight">
            Next 16 To-Do
          </h1>
          <span className="text-sm text-slate-300">
            SPA demo - JSONPlaceholder, React 19 (useEffectEvent, transition)
          </span>
        </header>

        <section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-4">
          <TodoForm onSubmit={addTodo} isPending={isPending} error={error} />

          <div className="flex items-center justify-between text-xs text-slate-400 select-none">
            <span>
              Total: <strong className="text-slate-100">{todos.length}</strong>
            </span>
            {isLoading && (
              <div className="flex items-center gap-1.5">
                <div className="size-3 shrink-0 border border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading todos...</span>
              </div>
            )}
            {isPending && !isLoading && (
              <div className="flex items-center gap-1.5">
                <div className="size-3 shrink-0 border border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Saving changes...</span>
              </div>
            )}
          </div>

          <TodoList
            todos={todos}
            isLoading={isLoading}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>
      </div>
    </main>
  )
}
