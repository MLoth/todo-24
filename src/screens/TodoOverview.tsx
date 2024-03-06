import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { uid } from 'uid'
import { Check, ChevronDown, Plus, Settings, Trash } from 'lucide-react'

import { Todo } from '../models/Todo'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'

export const TodoOverview = () => {
  const emptyTodo: Todo = {
    task: '',
    category: 'choose',
    isCompleted: false,
  }
  // TODO: remove item from list when checked (delayed by 3 seconds)
  // TODO: show error message when input fields are empty
  // TODO: make the input fields required (input validation - visible)

  // TODO: release better version (v1.1.0)
  const [isValid, setIsValid] = useState({
    task: {
      dirty: false, // Has the user interacted with the input field?
      valid: false,
    },
    category: {
      dirty: false,
      valid: false,
    },
  })

  const [todos, setTodos] = useState<Todo[]>(
    localStorage.todos ? JSON.parse(localStorage.todos) : [],
  )
  const [newTodo, setNewTodo] = useState<Todo>(emptyTodo)

  useEffect(() => {
    localStorage.todos = JSON.stringify(todos)
  }, [todos])

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Stop posting naar zelfde pagina

    if (newTodo.task === '' || newTodo.category === 'choose') return // TODO: show error message

    setNewTodo(() => {
      const currentNewTodo = { ...newTodo, id: uid() }
      setTodos([...todos, currentNewTodo]) // Combineer de huidige todos met de nieuwe todo
      // This might confuse some developers.
      return emptyTodo
    }) // Maak een unieke id aan voor het opslaan van deze nieuwe todo
  }

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-6">
      {/* Header: amount of todo & welcome message */}
      <div className="flex items-center justify-between">
        <AppHeader
          title="Hello, Marty!"
          todoCount={todos.filter((t: Todo) => !t.isCompleted).length}
        />
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
            <button
              className="h-auto rounded-full p-2 border border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent hover:text-white hover:bg-blue-500 disabled:opacity-10 disabled:cursor-not-allowed"
              disabled={!isValid.task.valid || !isValid.category.valid}
            >
              <Plus className="stroke-current" />
              <span className="sr-only">Add todo</span>
            </button>
          </div>

          <div className="w-full">
            <input
              className={`block w-full border border-neutral-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1 text-lg ${
                !isValid.task.valid && isValid.task.dirty
                  ? 'border-red-500 placeholder:text-red-300 focus:ring-red-700'
                  : ''
              }`}
              placeholder="Add a new todo..."
              type="text"
              name="new-todo"
              id="new-todo"
              value={newTodo.task}
              onInput={(event: React.FormEvent<HTMLInputElement>) => {
                setIsValid({
                  ...isValid,
                  task: {
                    dirty: true,
                    valid: event.currentTarget.value.length > 0,
                  },
                })
                setNewTodo({ ...newTodo, task: event.currentTarget.value })
              }}
              onBlur={(event: React.FormEvent<HTMLInputElement>) => {
                setIsValid({
                  ...isValid,
                  task: {
                    dirty: true,
                    valid: event.currentTarget.value.length > 0,
                  },
                })
              }}
            />
            <div className="flex justify-between items-center relative w-fit">
              <select
                className={`appearance-none w-full py-1 px-3 text-sm border pr-7 border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold placeholder:text-neutral-400 ${
                  !isValid.category.valid && isValid.category.dirty
                    ? 'border-red-500 placeholder:text-red-500 text-red-500 focus:ring-red-700'
                    : ''
                }`}
                name="category"
                id="category"
                value={newTodo.category}
                onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                  setIsValid({
                    ...isValid,
                    category: {
                      dirty: true,
                      valid: event.currentTarget.value !== 'choose',
                    },
                  })
                  setNewTodo({
                    ...newTodo,
                    category: event.currentTarget.value,
                  })
                }}
                onBlur={(event: React.FormEvent<HTMLSelectElement>) => {
                  setIsValid({
                    ...isValid,
                    category: {
                      dirty: true,
                      valid: event.currentTarget.value !== 'choose',
                    },
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
              <ChevronDown
                className={`absolute right-0 mr-1 pointer-events-none stroke-current text-neutral-400 ${
                  !isValid.category.valid && isValid.category.dirty
                    ? 'text-red-500'
                    : ''
                }`}
              />
            </div>
          </div>
        </form>

        <div className="flex flex-col gap-3">
          {todos.map((todo: Todo) => (
            <div
              className={`flex items-center justify-between gap-6 bg-white shadow py-2 px-6 rounded-2xl ${todo.isCompleted ? 'opacity-50' : ''}`}
              key={todo.id}
            >
              <input
                className="sr-only peer"
                type="checkbox"
                id={todo.id}
                onChange={() => toggleTodo(todo.id!)}
                checked={todo.isCompleted}
              />
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

              <button
                className="text-red-500 opacity-30 hover:opacity-100 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus:border-transparent hover:text-red-600 hover:bg-neutral-50 focus-visible:opacity-100"
                onClick={() => deleteTodo(todo.id!)}
              >
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
