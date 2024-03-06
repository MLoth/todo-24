export const AppHeader = ({
  title,
  todoCount,
}: {
  title: string
  todoCount?: number
}) => {
  const welcomeMessage = () => {
    if (todoCount === undefined || todoCount === null) return null
    if (todoCount === 1)
      return <p className="text-neutral-500">You have 1 todo left.</p>

    return (
      <p className="text-neutral-500">
        You have <span className="font-bold">{todoCount} todos</span> left.
      </p>
    )
  }

  return (
    <header className="mb-3 pt-12 pb-6">
      <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
        {title}
      </h1>
      {welcomeMessage()}
    </header>
  )
}
