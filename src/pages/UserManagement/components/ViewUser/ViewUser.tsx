import { FC, useEffect, useState } from 'react'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import { useNavigate, useParams } from 'react-router-dom'
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
} from 'react-icons/hi'
import { GrUserSettings } from 'react-icons/gr'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '@components/TabPanel'
import ForumUserItem from '../FourmUserItem'
import ModalAddEdit from '@components/ModalAddEdit'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { notifyActionSelector, userActionSelector, userStateSelector } from '@store/index'
import { IUserDetail } from '@interfaces/IUser'
import { formatDateFormDateLocal } from '@utils/functions/formatDay'

interface Props {}

const ViewUser: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { getUserById, editEdit, setIsEditUserSuccess } =
    useStoreActions(userActionSelector)
  const [loading, setLoading] = useState<boolean>(false)
  const { messageErrorUser, isEditUserSuccess } = useStoreState(userStateSelector)
  const [value, setValue] = useState(0)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [rowSelected, setRowSelected] = useState<IUserDetail>()

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const getUserByIdViewUser = async (): Promise<void> => {
    if (id) {
      const res = await getUserById(id)
      setRowSelected(res)
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setValue(newValue)
  }

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
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'>
          <Tab
            label='Account'
            {...a11yProps(0)}
          />
          <Tab
            label='Reset password'
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <div className='relative grid grid-cols-12 gap-2 h-full flex-1 mt-4 '>
        <ArrowBackIosOutlinedIcon
          onClick={() => navigate('/user-management')}
          sx={{ position: 'absolute', top: 8, left: 4, cursor: 'pointer' }}
        />
        <div className='col-span-3 border border-gray-300 rounded-xl'>
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
          <TabPanel
            value={value}
            index={0}>
            <ForumUserItem />
          </TabPanel>

          <TabPanel
            value={value}
            index={1}>
            <span>lalal</span>
          </TabPanel>
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
  )
}

export default ViewUser
