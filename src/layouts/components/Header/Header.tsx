import { FC } from 'react'
import AvatarHeader from '../AvatarHeader/AvatarHeader'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<Props> = ({ open, setOpen }: Props): JSX.Element => {
  return (
    <nav
      className={`z-30 fixed flex flex-row flex-nowrap items-center justify-between rounded-3xl mt-0 py-2 left-4 right-4 px-4 bg-white dark:bg-gray-800 shadow-sm transition-all duration-500 ease-in-out 
          ${open ? 'xl:left-24 sx:left-4' : 'xl:left-[304px] sx:left-4'}`}
      id='desktop-menu'>
      <button
        id='navbartoggle'
        type='button'
        className='inline-flex items-center justify-center text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-0'
        aria-controls='sidebar-menu'
        onClick={() => {
          setOpen(!open)
        }}
        aria-expanded='false'>
        <svg
          x-description='Icon closed'
          className='block h-10 w-10'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 16 16'>
          <path
            className={`${open ? 'hidden md:block' : 'md:hidden'}`}
            fillRule='evenodd'
            d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
          />
          <path
            className={!open ? 'hidden md:block' : 'md:hidden'}
            d='M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z'
          />
        </svg>
      </button>
      <ul className='flex ltr:ml-auto rtl:mr-auto mt-2'>
        <AvatarHeader />
      </ul>
    </nav>
  )
}

export default Header
