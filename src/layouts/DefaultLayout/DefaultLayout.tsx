import Header from '@layouts/components/Header/Header'
import Sidebar from '@layouts/components/Sidebar/Sidebar'
import { FC, useState } from 'react'
interface Props {
  children?: React.ReactNode
}

const DefaultLayout: FC<Props> = ({ children }: Props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div
      className='wrapper overflow-x-hidden bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 '
      dir='ltr'>
      <nav
        id='sidebar-menu'
        x-description='Mobile menu'
        className={`fixed transition-all duration-500 ease-in-out w-72 h-screen bg-white shadow-sm  z-[90]
          ${
            open
              ? 'xl:w-20 xs:translate-x-[-100%] xl:translate-x-0'
              : 'xl:w-72 xs:translate-x-0'
          }
        `}>
        <Sidebar open={open} />
      </nav>
      {!open && (
        <div
          className='fixed top-0 left-0 bottom-0 right-0 bg-slate-400/50 z-[80] xl:hidden cursor-pointer'
          onClick={() => setOpen(true)}></div>
      )}
      <div
        className={`flex flex-col min-h-screen transition-all duration-500 ease-in-out pt-3 mx-4 pb-4${
          open
            ? 'xl:ltr:-mr-72 xl:ltr:ml-24 xl:rtl:ml-24'
            : 'xl:ltr:mr-4 xl:ltr:ml-[304px] '
        }`}>
        <Header
          open={open}
          setOpen={setOpen}
        />
        <main className='mt-20 mb-4 flex flex-col flex-1 bg-white rounded-3xl p-4 overflow-y-hidden overflow-x-hidden'>
          {/* <Outlet />
           */}
          {children}
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
