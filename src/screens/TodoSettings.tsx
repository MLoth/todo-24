import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'

export const TodoSettings = () => {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-6">
      {/* TODO: can this be reused? */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            className="border border-neutral-200 bg-neutral-100 rounded-full p-2 text-neutral-400"
            to="/"
          >
            <ChevronLeft />
          </Link>
          <AppHeader title="Settings" />
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Footer: about the app (c) Martijn - CURRENT YEAR */}
      <AppFooter />
    </div>
  )
}
