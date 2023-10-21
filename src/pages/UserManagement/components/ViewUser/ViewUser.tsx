import { FC, useState } from 'react'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import { useNavigate } from 'react-router-dom'
import test from '../../../../assets/images/test.jpg'
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

interface Props {}

const FakeData = [
  {
    name: '20TCLC_DT4',
    avatarURL: test,
    topics: ['Lớp sinh hoạt'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
  {
    name: 'Vì yêu là cứ đâm đầu',
    avatarURL: test,
    topics: ['Fan', 'Người theo dõi', 'Người ủng hộ'],
    totalMember: 40,
  },
]

const ViewUser: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  // const [isEdit, setIsEdit] = useState<boolean>(false)
  const [value, setValue] = useState(0)

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
            <div className='h-36 w-36 rounded-[50%] overflow-hidden mt-6'>
              <img
                className='h-full w-full object-cover'
                src={test}
                alt=''
              />
            </div>
            <h4 className='font-semibold text-lg mt-2'>Trương Quang Khang</h4>
            <span className='text-sm font-thin mt-2'>22/07/2002</span>
            <span className='text-sm'>Male</span>

            <div className='flex flex-col px-4 gap-3 mt-2'>
              <div className='flex items-center'>
                <HiOutlineLocationMarker className='w-8 h-8 ' />
                <span className='text-sm ml-[14px]'>
                  54 Nguyễn Lương Bằng, Liên Chiểu Đà Nẵng
                </span>
              </div>
              <div className='flex items-center'>
                <HiOutlineMail className='w-6 h-6 ' />
                <span className='text-sm ml-4'>102200175@sv1.dut.udn.vn</span>
              </div>
              <div className='flex items-center'>
                <GrUserSettings className='w-6 h-6 ml-0.5 ' />
                <span className='text-sm ml-4'>Student</span>
              </div>
              <div className='flex items-center'>
                <HiOutlineOfficeBuilding className='w-6 h-6 ' />
                <span className='text-sm ml-4'>Information Technology</span>
              </div>
              <div className='flex items-center'>
                <HiOutlinePhone className='w-6 h-6 ' />
                <span className='text-sm ml-4'>0956256254</span>
              </div>
            </div>
            <div className='mt-auto mb-4'>
              <button
                // onClick={() => setIsEdit(true)}
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
            <div
              className='grid grid-cols-2 gap-4 flex-1 overflow-y-auto shrink'
              style={{ maxHeight: 'calc(100vh - 240px)' }}>
              {FakeData.map((item, index) => (
                <ForumUserItem
                  key={index}
                  item={item}
                />
              ))}
            </div>
          </TabPanel>

          <TabPanel
            value={value}
            index={1}>
            <span>lalal</span>
          </TabPanel>
        </div>
      </div>
    </>
  )
}

export default ViewUser
