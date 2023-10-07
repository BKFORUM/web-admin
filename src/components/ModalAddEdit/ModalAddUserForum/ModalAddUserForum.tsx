import Button from '@components/Button/Button'
import SearchInput from '@components/SearchInput'
import Checkbox from '@mui/material/Checkbox'
import { FC, useEffect, useRef, useState } from 'react'
import avatar from '../../../assets/images/test.jpg'

interface Props {
  handleAction?: any
  handleClose?: any
}

interface IUserAdd {
  id: number
  name: string
  checked: boolean
  avatar: any
  email: string
}

const FakeData = [
  {
    id: 102200155,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200156,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200157,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200158,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200159,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200160,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200161,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200162,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200163,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200164,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },

  {
    id: 102200165,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200166,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200167,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
  {
    id: 102200168,
    name: 'Nguyễn Văn Thịnh',
    avatar: avatar,
    email: '102200155@sv1.dut.udn.vn',
  },
]

const ModalAddUserForum: FC<Props> = ({ handleClose }: Props): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [data, setData] = useState<IUserAdd[]>([])
  const [userSelected, setUserSelected] = useState<IUserAdd[]>([])
  const ref = useRef<HTMLDivElement>(null)

  const scrollToLast = () => {
    const lastChildElement = ref.current?.lastElementChild
    lastChildElement?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const newData = FakeData.map((item) => {
      return { ...item, checked: false }
    })
    setData(newData)
  }, [])

  useEffect(() => {
    const listUserSelected = data.filter((item) => item.checked)
    setUserSelected(listUserSelected)
  }, [data])

  useEffect(() => {
    scrollToLast()
  }, [userSelected])

  const handleChangeSearch = (value: string): void => {
    setInputSearch(value)
  }

  const handleCheckboxChange = (itemId: number) => {
    setData((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item,
      ),
    )
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  return (
    <div className='flex flex-col gap-2 w-[500px] relative'>
      <h2 className='m-auto text-xl font-semibold'>Add Members</h2>
      <span
        className='absolute top-0 right-0 text-xl text-gray-500 cursor-pointer'
        onClick={() => handleClose()}>
        X
      </span>
      <div className='w-[500px]'>
        <SearchInput
          width='500px'
          size='small'
          value={inputSearch}
          setValue={handleChangeSearch}
        />
      </div>
      <div className='w-[500px] h-32 flex  overflow-y-hidden overflow-x-scroll'>
        {userSelected.length === 0 && (
          <span className='m-auto text-center opacity-50'>No user selected</span>
        )}
        <div
          className='flex gap-2 px-4'
          ref={ref}>
          {userSelected.length > 0 &&
            userSelected?.map((item, index) => (
              <div
                key={index}
                className='flex flex-col gap-1 items-start justify-center w-20 relative'>
                <div className='h-12 w-12  rounded-[50%] overflow-hidden ml-3'>
                  <img
                    src={item.avatar}
                    alt='avatar'
                  />
                  <span
                    onClick={() => handleCheckboxChange(item.id)}
                    className='absolute top-2.5 right-2.5 cursor-pointer text-gray-500 bg-white px-1.5 text-sm rounded-[50%] hover:bg-gray-200 transition-all duration-200 '>
                    X
                  </span>
                </div>
                <span className='text-sm text-center'>{item?.name}</span>
              </div>
            ))}
        </div>
      </div>
      <div
        className={`flex flex-col gap-1 h-[300px] ${
          data.length > 4 && 'overflow-y-scroll'
        }`}>
        <span className='text-lg font-semibold'>List user</span>
        {data?.map((item, index) => {
          return (
            <div
              key={index}
              className='flex justify-between items-center hover:bg-slate-100 cursor-pointer rounded-xl py-1.5 '
              onClick={() => handleCheckboxChange(item.id)}>
              <div className='flex gap-2 items-center'>
                <div className='h-12 w-12  rounded-[50%] overflow-hidden ml-3'>
                  <img
                    src={item.avatar}
                    alt='avatar'
                  />
                </div>
                <span>
                  {item?.name} <span>({item.email})</span>
                </span>
              </div>

              <Checkbox
                {...label}
                checked={item?.checked}
              />
            </div>
          )
        })}
      </div>

      <Button
        typeButton='primary'
        disabled={userSelected.length === 0 ? true : false}
        onClick={() => scrollToLast()}
        className={`mt-4`}>
        Add
      </Button>
    </div>
  )
}

export default ModalAddUserForum
