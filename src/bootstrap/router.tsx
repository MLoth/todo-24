import { createBrowserRouter } from 'react-router-dom'

import { TodoOverview } from '../screens/TodoOverview'
import { TodoSettings } from '../screens/TodoSettings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoOverview />,
  },
  {
    path: '/settings',
    element: <TodoSettings />,
  },
  // TODO: Add a 404 page
  {
    path: '*',
    element: <div>404</div>,
  },
])

// Export the router to be used in the app
export default router
