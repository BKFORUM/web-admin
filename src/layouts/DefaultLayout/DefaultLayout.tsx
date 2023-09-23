import Header from '@layouts/components/Header/Header'
import Sidebar from '@layouts/components/Sidebar/Sidebar'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
interface Props {}

const DefaultLayout: FC<Props> = (): JSX.Element => {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
