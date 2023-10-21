import Button from '@components/Button/Button'
import SearchInput from '@components/SearchInput'
import Checkbox from '@mui/material/Checkbox'
import { FC, useEffect, useRef, useState } from 'react'
import avatar from '../../../assets/images/test.jpg'
import { useStoreActions } from 'easy-peasy'
import { userActionSelector } from '@store/index'
import { IViewUserAddList } from '@interfaces/IForum'
import { useParams } from 'react-router-dom'

interface Props {
  handleAction: (data: any) => Promise<void>
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAddUserForum: FC<Props> = ({
  handleClose,
  handleAction,
}: Props): JSX.Element => {
  const { id } = useParams()
  const { getAllUser } = useStoreActions(userActionSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [data, setData] = useState<IViewUserAddList[]>([])
  const [userSelected, setUserSelected] = useState<IViewUserAddList[]>([])
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const getAllUserNoForumCurrent = async (): Promise<void> => {
    setIsLoading(true)
    const res = await getAllUser({
      // search: inputSearch,
      take: 100000000,
      forumId: id,
      isInForum: false,
    })
    if (res) {
      console.log(res)
      const data = res?.data?.map((item: any) => ({
        ...item,
        avatarUrl: avatar,
        checked: false,
      }))
      setData(data)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  const scrollToLast = () => {
    const lastChildElement = ref.current?.lastElementChild
    lastChildElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChangeSearch = (value: string): void => {
    setInputSearch(value)
  }

  const handleCheckboxChange = (itemId: string) => {
    setData((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item,
      ),
    )
  }

  const handleAdd = (): void => {
    const userIds = userSelected.map((item) => item.id)
    handleAction({ userIds })
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  useEffect(() => {
    getAllUserNoForumCurrent()
  }, [])

  useEffect(() => {
    const listUserSelected = data.filter((item) => item.checked)
    setUserSelected(listUserSelected)
  }, [data])

  useEffect(() => {
    scrollToLast()
  }, [userSelected])
  return (
    <div className='flex flex-col gap-2 w-[500px] relative'>
      <h2 className='m-auto text-xl font-semibold'>Add Members</h2>
      <span
        className='absolute top-0 right-0 text-xl text-gray-500 cursor-pointer'
        onClick={() => handleClose(false)}>
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
                className='flex flex-col gap-1 items-start  w-20 relative mt-'>
                <div className='h-12 w-12  rounded-[50%] overflow-hidden ml-3'>
                  <img
                    src={item.avatarUrl}
                    alt='avatar'
                  />
                  <span
                    onClick={() => handleCheckboxChange(item.id)}
                    className='absolute top-0.5 right-2.5 cursor-pointer text-gray-500 bg-white px-1.5 text-sm rounded-[50%] hover:bg-gray-200 transition-all duration-200 '>
                    X
                  </span>
                </div>
                <span className='text-sm text-center'>{item?.fullName}</span>
              </div>
            ))}
        </div>
      </div>
      <div
        className={`flex flex-col gap-1 h-[300px] ${
          data.length > 4 && 'overflow-y-scroll'
        }`}>
        <span className='text-lg font-semibold'>List user</span>
        {isLoading && <span>Loading</span>}
        {data.length === 0 && <span>ko có user</span>}
        {!isLoading &&
          data?.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex justify-between items-center cursor-pointer rounded-xl py-1.5 ${
                  item.checked ? 'bg-slate-100' : 'hover:bg-slate-100'
                } `}
                onClick={() => handleCheckboxChange(item.id)}>
                <div className='flex gap-2 items-center'>
                  <div className='h-12 w-12  rounded-[50%] overflow-hidden ml-3'>
                    <img
                      src={item.avatarUrl}
                      alt='avatar'
                    />
                  </div>
                  <span>
                    {item?.fullName} <span>({item.email})</span>
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
        onClick={() => {
          handleAdd()
          handleClose(false)
        }}
        disabled={userSelected.length === 0 ? true : false}
        className={`mt-4`}>
        Add
      </Button>
    </div>
  )
}

export default ModalAddUserForum
