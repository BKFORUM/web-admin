import { FC, useCallback, useEffect, useState } from 'react'
import logo from '../../../assets/images/logobkforum.png'
import logo1 from '../../../assets/images/logo-1.jpg'
import { DATA_SIDEBAR } from '@commom/constants'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import { HiOutlineUserGroup, HiOutlineStar, HiOutlinePencilSquare } from 'react-icons/hi2'
import { useLocation, useNavigate } from 'react-router-dom'

interface IProps {
  open: boolean
}

interface IDataSidebar {
  id: number
  name: string
  pathName: string
  icon: string
  children: []
}

const Sidebar: FC<IProps> = ({ open }: IProps): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [selected, setSelected] = useState<number | null>(null)
  useEffect(() => {
    const routePath = `/${pathname.split('/')[1]}`
    DATA_SIDEBAR.map((item) => {
      if (routePath === item.pathName) {
        setSelected(item.id)
      }
    })
  }, [])
  const _renderIcon = useCallback((dataSidebar: IDataSidebar) => {
    let result = null
    switch (dataSidebar?.icon) {
      case 'dashboard': {
        result = (
          <MdOutlineCalendarMonth className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        )
        break
      }
      case 'user': {
        result = <HiOutlineUserGroup className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        break
      }
      case 'post': {
        result = (
          <HiOutlinePencilSquare className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        )
        break
      }
      case 'event': {
        result = <HiOutlineStar className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        break
      }
      default: {
        result = (
          <MdOutlineCalendarMonth className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        )
      }
    }
    return result
  }, [])
  return (
    <div className={`h-full overflow-y-auto scrollbars bg-[#0001CB] xl:translate-x-0 `}>
      <div className='mh-18 text-center py-3 mt-1'>
        <a
          onClick={() => {}}
          className='relative cursor-pointer'>
          <div className='flex justify-center px-2'>
            <img
              className={`${open ? 'h-14' : ' h-full w-full'}`}
              src={open ? logo1 : logo}
              alt='Logo'
            />
          </div>
        </a>
      </div>

      <ul
        id='side-menu'
        className='w-full float-none flex flex-col font-medium ltr:pr-2 ltr:pl-2 rtl:pr-2'>
        {DATA_SIDEBAR.map((dataItem: any, index: number) => (
          <li
            className={`relative ${open && 'pt-2'}  `}
            key={JSON.parse(JSON.stringify(dataItem)) + index}>
            <a
              className={`flex py-1 text-white cursor-pointer `}
              onClick={() => {
                // checkDevice() && props?.setOpen(false)
                if (selected != dataItem?.id) {
                  setSelected(dataItem?.id)
                  navigate(dataItem?.pathName)
                  // setSelectedChildren(null)
                }
              }}>
              <div
                className={`flex w-full justify-start items-center px-2 py-2.5 rounded-md 
                 ${
                   selected === index && 'bg-white/60 shadow-[1px_7px_13px_0px_#2c5282]'
                 } `}>
                <div className='ml-[8px]'>{_renderIcon(dataItem)}</div>
                <span className={`text-xl font-semibold ml-2 ${open && 'hidden'} `}>
                  {dataItem?.name}
                </span>
              </div>
              {!!dataItem?.children?.length && (
                <span
                  onClick={(event: any) => {
                    event.preventDefault()
                    event.stopPropagation()
                    // if (selected != dataItem?.id) {
                    //   setSelected(dataItem?.id)
                    // } else {
                    //   setSelected(null)
                    // }
                  }}
                  className='inline-block ltr:float-right rtl:float-left'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className={`transform transition duration-300 mt-1.5 bi bi-chevron-down `}
                    width='.8rem'
                    height='.8rem'
                    viewBox='0 0 16 16'>
                    <path
                      fillRule='evenodd'
                      d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                    />
                  </svg>
                </span>
              )}
            </a>

            {/* {selected == dataItem?.id && !!dataItem?.children?.length && (
              <ul className='block rounded rounded-t-none top-full z-50 ltr:pl-7 rtl:pr-7 py-0.5 ltr:text-left rtl:text-right mb-1 font-medium'>
                {dataItem?.children?.map((elementChildren: any, elementIndex: number) => (
                  <li
                    className='relative'
                    key={JSON.parse(JSON.stringify(elementChildren)) + elementIndex}>
                    <a
                      onClick={() => {
                        route.push(elementChildren?.pathName)
                        checkDevice() && props?.setOpen(false)
                        selectedChildren != elementChildren?.id &&
                          setSelectedChildren(elementChildren?.id)
                      }}
                      aria-haspopup='true'
                      id='auth'
                      className={`flex text-sm block py-[0.8125rem] px-3 hover:text-primary-400 dark:hover:text-gray-300 cursor-pointer ${
                        selectedChildren == elementChildren?.id &&
                        'text-primary-400 dark:text-gray-300'
                      }`}>
                      <p className='text-xl leading-5 mr-1'>•</p> {elementChildren?.name}
                      {!!elementChildren?.children?.length && (
                        <span
                          onClick={(event: any) => {
                            event.preventDefault()
                            event.stopPropagation()
                            if (selectedChildren != elementChildren?.id) {
                              setSelectedChildren(elementChildren?.id)
                            }
                          }}
                          className='inline-block ltr:float-right rtl:float-left'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            className={`transform transition duration-300 mt-1.5 bi bi-chevron-down ${
                              selectedChildren == elementChildren?.id
                                ? 'rotate-0'
                                : 'ltr:-rotate-90 rtl:rotate-90'
                            }`}
                            width='.8rem'
                            height='.8rem'
                            viewBox='0 0 16 16'>
                            <path
                              fillRule='evenodd'
                              d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                            />
                          </svg>
                        </span>
                      )}
                    </a>
                    {selectedChildren == elementChildren?.id &&
                      !!elementChildren?.children?.length && (
                        <ul
                          className='block rounded rounded-t-none top-full z-50 ltr:pl-7 rtl:pr-7 py-0.5 ltr:text-left rtl:text-right mb-1 font-medium'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='auth'>
                          {elementChildren?.children.map(
                            (element: any, elementIndex: number) => (
                              <li
                                className='relative'
                                key={JSON.parse(JSON.stringify(element)) + elementIndex}>
                                <a
                                  className={`block w-full py-0.5 px-6 clear-both whitespace-nowrap hover:text-primary-400 dark:hover:text-gray-300 cursor-pointer ${
                                    selectedElementChildren == element?.id &&
                                    'text-primary-400 dark:text-gray-300'
                                  }`}
                                  onClick={() => {
                                    checkDevice() && props?.setOpen(false)
                                    route.push(element?.pathName)
                                  }}>
                                  <p className='text-xl leading-5 mr-1'>•</p>{' '}
                                  {element?.name}
                                </a>
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
