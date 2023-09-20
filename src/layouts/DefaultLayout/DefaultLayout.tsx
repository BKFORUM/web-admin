import Header from '@layouts/components/Header/Header'
import Sidebar from '@layouts/components/Sidebar/Sidebar'
import { FC } from 'react'

interface Props {}

const DefaultLayout: FC<Props> = (): JSX.Element => {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        <div>content</div>
      </div>
    </div>
  )
}

export default DefaultLayout
