import { Transition } from '@headlessui/react'
import { FC, Fragment, useState } from 'react'
import test from '../../../assets/images/test.jpg'
import { useClickOutside } from '@hooks/useClickOutside'
import { ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

interface Props {}

const AvatarHeader: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  let elementRef: any = useClickOutside(() => {
    if (open) {
      setOpen(false)
    }
  })
  const _logout = (): void => {
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <div className='relative'>
      <div
        className='px-3 flex text-sm rounded-full focus:outline-none cursor-pointer'
        id='user-menu-button'
        onClick={() => {
          setOpen(!open)
        }}>
        <div className='relative'>
          <img
            className='h-10 w-10 rounded-full border border-gray-700 bg-gray-700 object-cover mr-2'
            src={test}
            alt='avatar'
          />
          <span
            title='online'
            className='flex justify-center absolute -bottom-0.5 ltr:right-2 rtl:left-2 text-center bg-green-500 border border-white w-3 h-3 rounded-full'></span>
        </div>
        <span className='hidden md:block ltr:ml-1 rtl:mr-1 self-center font-semibold text-base'>
          Truong Quang Kang
        </span>
      </div>
      <Transition
        show={open}
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <ul
          ref={elementRef}
          onClick={() => {
            setOpen(false)
          }}
          className={`origin-top-right absolute ltr:right-0 rtl:left-0 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white border shadow-md`}
          style={{ minWidth: '12rem' }}>
          <li className='relative group '>
            <a
              className='block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-primary-400 cursor-pointer group-hover:opacity-50 '
              // onClick={_changePassword}
            >
              <Cog6ToothIcon className='inline ltr:mr-2 rtl:ml-2 w-4 h-4' />
              Change Password
            </a>
          </li>
          <li className='relative'>
            <hr className='border-t border-gray-200 my-0' />
          </li>
          <li className='relative group'>
            <a
              className='block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-primary-400 cursor-pointer text-red-600 group-hover:opacity-70'
              onClick={_logout}>
              <ArrowRightOnRectangleIcon className='inline ltr:mr-2 rtl:ml-2 w-4 h-4 text-red-600' />
              Log out
            </a>
          </li>
        </ul>
      </Transition>
    </div>
  )
}

export default AvatarHeader
