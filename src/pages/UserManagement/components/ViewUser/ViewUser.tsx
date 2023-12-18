import { FC, useEffect, useState } from 'react'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import { useNavigate, useParams } from 'react-router-dom'
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
  HiOutlineKey,
} from 'react-icons/hi'
import { GrUserSettings } from 'react-icons/gr'
import ForumUserItem from '../FourmUserItem'
import ModalAddEdit from '@components/ModalAddEdit'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { notifyActionSelector, userActionSelector, userStateSelector } from '@store/index'
import { IUserDetail } from '@interfaces/IUser'
import { formatDateFormDateLocal } from '@utils/functions/formatDay'
import noData from '../../../../assets/images/notFoundSearch.jpg'
import { Tooltip } from '@mui/material'
import ModalConfirm from '@components/ModalConfirm'

interface Props {}

const ViewUser: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { getUserById, editEdit, setIsEditUserSuccess, resetPassword } =
    useStoreActions(userActionSelector)
  const { messageErrorUser, isEditUserSuccess } = useStoreState(userStateSelector)

  const [statusPageDetail, setStatusPageDetail] = useState<string>('')
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [rowSelected, setRowSelected] = useState<IUserDetail>()

  const getUserByIdViewUser = async (): Promise<void> => {
    if (id) {
      setStatusPageDetail('LOADING')
      const res = await getUserById(id)
      if (res) {
        setRowSelected(res)
        setStatusPageDetail('SUCCESS')
      } else setStatusPageDetail('NODATA')
    }
  }

  useEffect(() => {
    if (!isEditUserSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorUser })
      setIsEditUserSuccess(true)
    }
  }, [isEditUserSuccess])

  useEffect(() => {
    getUserByIdViewUser()
  }, [])

  const handleAction = async (data: any): Promise<void> => {
    setLoading(true)
    const yourTime = new Date(data?.dateOfBirth)
    const res = await editEdit({ ...data, dateOfBirth: yourTime.toISOString() })
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Update user successful',
      })
      getUserByIdViewUser()
      setOpenModalEdit(false)
    }
    setLoading(false)
  }

  const handleResetPassword = async (): Promise<void> => {
    const res = await resetPassword(String(rowSelected?.id))
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Reset password successful',
      })
    }
    setOpenModalConfirm(false)
  }

  return (
    <>
      {statusPageDetail === 'SUCCESS' && (
        <>
          <div className='relative grid grid-cols-12 gap-2 h-full flex-1 mt-4 '>
            <div className=' relative col-span-3 border border-gray-300 rounded-xl'>
              <div className='absolute top-2.5 left-1.5 '>
                <Tooltip title='Back'>
                  <div>
                    <ArrowBackIosOutlinedIcon
                      onClick={() => navigate('/user-management')}
                      className='hover:text-blue-700 cursor-pointer h-6 w-6'
                    />
                  </div>
                </Tooltip>
              </div>
              <div className='absolute top-3 right-3 '>
                <Tooltip title='Reset password'>
                  <div>
                    <HiOutlineKey
                      onClick={() => setOpenModalConfirm(true)}
                      className='hover:text-red-700 cursor-pointer h-6 w-6'
                    />
                  </div>
                </Tooltip>
              </div>
              <div className='flex flex-col  items-center h-full'>
                <div className='h-36 w-36 rounded-[50%] overflow-hidden mt-6 border border-gray-200'>
                  <img
                    className='h-full w-full object-cover '
                    src={rowSelected?.avatarUrl}
                    alt=''
                  />
                </div>
                <h4 className='font-semibold text-lg mt-2'>{rowSelected?.fullName}</h4>
                <span className='text-sm font-thin mt-2'>
                  {formatDateFormDateLocal(String(rowSelected?.dateOfBirth))}
                </span>
                <span className='text-sm'>{rowSelected?.gender}</span>

                <div className='flex flex-col px-4 gap-3 mt-2'>
                  <div className='flex items-center'>
                    <HiOutlineLocationMarker className='w-8 h-8 ' />
                    <span className='text-sm ml-[14px]'>{rowSelected?.address}</span>
                  </div>
                  <div className='flex items-center'>
                    <HiOutlineMail className='w-6 h-6 ' />
                    <span className='text-sm ml-4'>{rowSelected?.email}</span>
                  </div>
                  <div className='flex items-center'>
                    <GrUserSettings className='w-6 h-6 ml-0.5 ' />
                    <span className='text-sm ml-4'>{rowSelected?.type}</span>
                  </div>
                  <div className='flex items-center'>
                    <HiOutlineOfficeBuilding className='w-6 h-6 ' />
                    <span className='text-sm ml-4'>{rowSelected?.faculty?.name}</span>
                  </div>
                  <div className='flex items-center'>
                    <HiOutlinePhone className='w-6 h-6 ' />
                    <span className='text-sm ml-4'>{rowSelected?.phoneNumber}</span>
                  </div>
                </div>
                <div className='mt-auto mb-4'>
                  <button
                    onClick={() => setOpenModalEdit(true)}
                    className='px-6 py-1 bg-[#E6F0F6] text-black font-thin rounded-2xl hover:bg-cyan-400/20 transition-all duration-200'>
                    Edit profile
                  </button>
                </div>
              </div>
            </div>

            <div className='col-span-9  border border-gray-300 rounded-xl p-4 flex flex-col  '>
              <ForumUserItem />
            </div>
          </div>

          {openModalEdit ? (
            <ModalAddEdit
              loading={loading}
              open={openModalEdit}
              rowSelected={rowSelected}
              handleClose={() => setOpenModalEdit(false)}
              handleAction={handleAction}
              page='USER'
            />
          ) : null}
        </>
      )}

      {statusPageDetail === 'NODATA' && (
        <div className='flex-1 flex flex-col items-center justify-center bg-white'>
          <div className='h-52 w-52'>
            <img
              className='h-full w-full'
              src={noData}
              alt='not found search'
            />
          </div>
          <span>We're sorry. We were not able to find a match</span>
        </div>
      )}

      {statusPageDetail === 'LOADING' && (
        <div className='relative flex-1 flex flex-col items-center  h-full  '>
          <div
            role='status'
            className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2'>
            <svg
              aria-hidden='true'
              className='w-10 h-10 text-gray-200 animate-spin fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}

      {openModalConfirm ? (
        <ModalConfirm
          open={openModalConfirm}
          handleClose={() => {
            setOpenModalConfirm(false)
          }}
          title='Are you sure to reset your password'
          handleDelete={handleResetPassword}
        />
      ) : null}
    </>
  )
}

export default ViewUser
