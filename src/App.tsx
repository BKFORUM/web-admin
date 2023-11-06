import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { routerAdmin } from '@routes/router'
import Login from '@pages/Login'
import NotFound from '@pages/NotFound'
import ProtectedRoute from '@routes/ProtectedRoute'
import RedirectForum from '@routes/RedirectForum'
import Notify from '@components/Notify'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { notifyActionSelector, notifyStateSelector } from './store'

function App() {
  const { notifySetting } = useStoreState(notifyStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  return (
    <>
      <Routes>
        {routerAdmin.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <DefaultLayout>
                    <route.element />
                  </DefaultLayout>
                </ProtectedRoute>
              }
            />
          )
        })}
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

      <Notify
        notifySetting={notifySetting}
        setNotifySetting={setNotifySetting}
      />
    </>
  )
}

export default App
