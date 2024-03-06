import { Todo } from '../models/Todo'

import { Check, Trash } from 'lucide-react'

const TodoItem = ({
  todo,
  toggle,
  remove,
}: {
  todo: Todo
  toggle: (id: string) => void
  remove: (id: string) => void
}) => {
  return (
    <div
      className={`flex items-center justify-between gap-6 bg-white shadow py-2 px-6 rounded-2xl ${todo.isCompleted ? 'opacity-50' : ''}`}
      key={todo.id}
    >
      <input
        className="sr-only peer"
        type="checkbox"
        id={todo.id}
        onChange={() => toggle(todo.id!)}
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
        onClick={() => remove(todo.id!)}
      >
        <Trash className="stroke-current" />
      </button>
    </div>
  )
}

export default TodoItem
