import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'

import { Todo } from '../models/Todo'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import TodoItem from '../components/TodoItem'
import TodoInput from '../components/TodoInput'

export const TodoOverview = () => {
  const [todos, setTodos] = useState<Todo[]>(
    localStorage.todos ? JSON.parse(localStorage.todos) : [],
  )

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

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-6">
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
        <TodoInput
          addToParentState={(newTodo: Todo) => setTodos([...todos, newTodo])}
        />

        <div className="flex flex-col gap-3">
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id!}
              todo={todo}
              toggle={toggleTodo}
              remove={deleteTodo}
            />
          ))}
        </div>
      </div>

      <AppFooter />
    </div>
  )
}
