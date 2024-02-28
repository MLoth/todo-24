export const AppHeader = ({ todoCount }: { todoCount: number }) => {
  const welcomeMessage = () => {
    if (todoCount === 1) {
      return <>You have 1 todo left.</>
    } else {
      return (
        <>
          You have <span className="font-bold">{todoCount} todos</span> left.
        </>
      )
    }
  }

  return (
    <header className="mb-3 pt-12 pb-6">
      <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
        Hello, Marty!
      </h1>
      <p className="text-neutral-500">{welcomeMessage()}</p>
    </header>
  )
}
