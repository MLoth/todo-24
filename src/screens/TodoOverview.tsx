import { useState } from 'react'
import { Check, ChevronDown, Plus, Settings, Trash } from 'lucide-react'

import { Todo } from '../models/Todo'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import { uid } from 'uid'
import { Link } from 'react-router-dom'

export const TodoOverview = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<Todo>({
    task: '',
    category: 'choose',
    isCompleted: false,
  })

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Stop posting naar zelfde pagina

    if (newTodo.task === '' || newTodo.category === 'choose') return // TODO: show error message

    setNewTodo(() => {
      const currentNewTodo = { ...newTodo, id: uid() }
      setTodos([...todos, currentNewTodo]) // Combineer de huidige todos met de nieuwe todo
      return currentNewTodo
    }) // Maak een unieke id aan voor het opslaan van deze nieuwe todo
  }

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-6">
      {/* Header: amount of todo & welcome message */}
      <div className="flex items-center justify-between">
        <AppHeader title="Hello, Marty!" todoCount={todos.length} />
        <Link
          className="border border-neutral-200 bg-neutral-100 rounded-full p-2 text-neutral-400"
          to="/settings"
        >
          <Settings />
        </Link>
      </div>

      <div className="flex-1">
        <form
          className="flex gap-6 bg-white shadow py-3 px-6 rounded-2xl mb-6"
          onSubmit={addNewTodo}
        >
          <div className="flex items-center">
            <button className="h-auto rounded-full p-2 border border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent hover:text-white hover:bg-blue-500">
              <Plus className="stroke-current" />
              <span className="sr-only">Add todo</span>
            </button>
          </div>

          <div className="w-full">
            <input
              className="block w-full border border-neutral-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1 text-lg"
              placeholder="Add a new todo..."
              type="text"
              name="new-todo"
              id="new-todo"
              value={newTodo.task}
              onInput={(event: React.FormEvent<HTMLInputElement>) => {
                setNewTodo({ ...newTodo, task: event.currentTarget.value })
              }}
            />
            <div className="flex justify-between items-center relative w-fit">
              <select
                className="appearance-none w-full py-1 px-3 text-sm border pr-7 border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold placeholder:text-neutral-400"
                name="category"
                id="category"
                value={newTodo.category}
                onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                  setNewTodo({
                    ...newTodo,
                    category: event.currentTarget.value,
                  })
                }}
              >
                <option disabled value={'choose'}>
                  Choose a category.
                </option>
                <option value="hobby">Hobby</option>
                <option value="work">Work</option>
                <option value="nevenactiviteiten">Nevenactiviteiten</option>
              </select>
              <ChevronDown className="absolute right-0 mr-1 pointer-events-none stroke-current text-neutral-400" />
            </div>
          </div>
        </form>

        <div className="flex flex-col gap-3">
          {todos.map((todo: Todo) => (
            <div
              className="flex items-center justify-between gap-6 bg-white shadow py-2 px-6 rounded-2xl"
              key={todo.id}
            >
              <input className="sr-only peer" type="checkbox" id={todo.id} />
              <label
                className="flex items-center justify-center peer-checked:bg-blue-500 peer-checked:text-blue-100 rounded-full cursor-pointer p-2 border border-neutral-200 focus:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 focus:border-transparent hover:text-blue-500 hover:bg-blue-100 text-neutral-200"
                htmlFor={todo.id}
              >
                <Check className="stroke-current stroke-4" />
              </label>
              <div className="flex-1">
                <p>{todo.task}</p>
                <p className="">{todo.category}</p>
              </div>

              <button className="text-red-500 opacity-30 hover:opacity-100 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus:border-transparent hover:text-red-600 hover:bg-neutral-50 focus-visible:opacity-100">
                <Trash className="stroke-current" />
              </button>
            </div>
          ))}
        </div>
        {/* TODO: show message when there a no todos */}
      </div>

      {/* Footer: about the app (c) Martijn - CURRENT YEAR */}
      <AppFooter />
    </div>
  )
}
