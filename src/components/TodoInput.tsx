import { useState } from 'react'
import { uid } from 'uid'
import { ChevronDown, Plus } from 'lucide-react'

import { Todo } from '../models/Todo'

const TodoInput = () => {
  const emptyTodo: Todo = {
    task: '',
    category: 'choose',
    isCompleted: false,
  }

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
  const [newTodo, setNewTodo] = useState<Todo>(emptyTodo)

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Stop posting naar zelfde pagina

    if (newTodo.task === '' || newTodo.category === 'choose') return

    setNewTodo(() => {
      const currentNewTodo = { ...newTodo, id: uid() }
      // TODO: handle this in the parent component
      setTodos([...todos, currentNewTodo]) // Combineer de huidige todos met de nieuwe todo
      // This might confuse some developers.
      return emptyTodo
    }) // Maak een unieke id aan voor het opslaan van deze nieuwe todo
  }

  return (
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
  )
}

export default TodoInput
