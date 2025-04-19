import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux';
import VisitorLayout from './Layout/VisitorLayout'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Pages/Home'
import UserLayout from './Layout/UserLayout'
import { ProtectedRoute } from './Protected/protectedRouter'
import PageNotFound from './Components/PageNotFound'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import IncomePage from './Pages/IncomePage'
import ExpensePage from './Pages/ExpensePage'
import LogOut from './Components/LogOut'
import { NotProtectedRoute } from './Protected/NotprotectedRouter'
import { store } from './store/store';
const Router = createBrowserRouter([
  {
    path: '/',
    element: <NotProtectedRoute children={<VisitorLayout />} />,
    children: [
      {
        path: '',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  },
  {
    path: '/',
    element: <ProtectedRoute children={<UserLayout />} />,
    children: [
      {
        path: 'dashboard',
        element: <Home />
      },
      {
        path: 'income',
        element: <IncomePage />
      },
      {
        path: 'expense',
        element: <ExpensePage />
      },
      {
        path: 'logout',
        element: <LogOut />
      }
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])
const App: React.FC = () => {
  const client = new QueryClient();
  return (
    <div className='dark:bg-gray-900'>
      <Provider store={store}  >

      <QueryClientProvider client={client}>
        <ToastContainer />
        <RouterProvider router={Router}>
        </RouterProvider>
      </QueryClientProvider>
      </Provider>
    </div>
  )
}

export default App