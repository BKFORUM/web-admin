import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { routerAdmin } from '@routes/router'
import Login from '@pages/Login'
import NotFound from '@pages/NotFound'
import ProtectedRoute from '@routes/ProtectedRoute'
import RedirectForum from '@routes/RedirectForum'

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }>
          {routerAdmin.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            )
          })}
        </Route>
        <Route
          path='/login'
          element={
            <RedirectForum>
              <Login />
            </RedirectForum>
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  )
}

export default App
