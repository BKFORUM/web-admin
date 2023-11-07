import TabPanel from '@components/TabPanel'
import { Box, Tab, Tabs } from '@mui/material'
import { GrUserSettings } from 'react-icons/gr'
import { HiUser } from 'react-icons/hi2'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'
import { userActionSelector } from '@store/index'
import { IUserForumResponse } from '@interfaces/IUser'
import defaultAvatar from '../../../../assets/images/default_forum.png'

interface Props {}

const ForumUserItem: FC<Props> = (): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getAllForumByUser } = useStoreActions(userActionSelector)

  const [value, setValue] = useState(0)
  const [dataForum, setDataForum] = useState<IUserForumResponse[]>([])

  const getAllForumByUserData = async (): Promise<void> => {
    if (id) {
      const res = await getAllForumByUser(id)
      if (res) {
        setDataForum(res)
      }
    }
  }

  useEffect(() => {
    getAllForumByUserData()
  }, [])

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setValue(newValue)
  }
  return (
    <div className=''>
      <Box sx={{ borderColor: 'divider', boxShadow: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label='basic tabs example'>
          <Tab
            label='Moderator'
            {...a11yProps(0)}
          />
          <Tab
            label='Member'
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <div
        className='mt-4 px-2 overflow-y-auto overflow-x-hidden'
        style={{ maxHeight: 'calc(100vh - 304px)' }}>
        <TabPanel
          value={value}
          index={0}>
          <div className='grid grid-cols-2 gap-5 pb-2 px-2'>
            {dataForum.map((item, index) => {
              if (item.moderator.id === id)
                return (
                  <div
                    key={index}
                    onClick={() => navigate('/forum-management/' + item.id)}
                    className='p-2 rounded-xl flex items-start flex-1 gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                    transform hover:scale-105 duration-500 ease-in-out cursor-pointer
                    '>
                    <div className='h-20 w-20 rounded-lg overflow-hidden'>
                      <img
                        className='h-full w-full object-cover'
                        src={item.avatarUrl || defaultAvatar}
                        alt=''
                      />
                    </div>
                    <div className='flex flex-col flex-1 gap-1 mb-auto'>
                      <h4 className='text-xl font-semibold pt-0'>{item.name}</h4>
                      <div className='flex flex-wrap gap-2'>
                        {item.topics.map((data: any, index) => (
                          <span
                            key={index}
                            className='px-2 py-1 bg-[#E6F0F6] rounded-2xl text-xs'>
                            {data?.topic.name}
                          </span>
                        ))}
                      </div>
                      <div className='flex items-center gap-1'>
                        <div className='flex items-center'>
                          <GrUserSettings className='w-4 h-4 mr-2' />
                          <span className='text-sm font-medium'>Moderator</span>
                        </div>
                        <span className='text-sm ml-1'>
                          {item._count.users} <span>member</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )
            })}
          </div>
        </TabPanel>

        <TabPanel
          value={value}
          index={1}>
          <div className='grid grid-cols-2 gap-5 pb-2'>
            {dataForum.map((item, index) => {
              if (item.moderator.id !== id)
                return (
                  <div
                    key={index}
                    onClick={() => navigate('/forum-management/' + item.id)}
                    className='p-2 rounded-xl flex items-start flex-1 gap-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]
                    transform hover:scale-105 duration-500 ease-in-out cursor-pointer
                    '>
                    <div className='h-20 w-20 rounded-lg overflow-hidden'>
                      <img
                        className='h-full w-full object-cover'
                        src={item.avatarUrl || defaultAvatar}
                        alt=''
                      />
                    </div>
                    <div className='flex flex-col flex-1 gap-1 mb-auto'>
                      <h4 className='text-xl font-semibold pt-0'>{item.name}</h4>
                      <div className='flex flex-wrap gap-2'>
                        {item.topics.map((data: any, index) => (
                          <span
                            key={index}
                            className='px-2 py-1 bg-[#E6F0F6] rounded-2xl text-xs'>
                            {data?.topic.name}
                          </span>
                        ))}
                      </div>
                      <div className='flex items-center gap-1 '>
                        <HiUser className='w-4 h-4' />
                        <span className='text-sm '>
                          {item._count.users} <span>member</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )
            })}
          </div>
        </TabPanel>
      </div>
    </div>
  )
}

export default ForumUserItem
