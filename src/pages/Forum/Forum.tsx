import { FC, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '@components/TabPanel'
import ForumTab from './component/ForumTab'
import RequestForum from './component/RequestForum'

interface Props {}

const Forum: FC<Props> = (): JSX.Element => {
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
      <div className='w-full h-full px-1 overflow-x-hidden'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'>
            <Tab
              label='Forum'
              {...a11yProps(0)}
            />
            <Tab
              label='Request - Forums'
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <TabPanel
          value={value}
          index={0}>
          <ForumTab />
        </TabPanel>

        <TabPanel
          value={value}
          index={1}>
          <RequestForum />
        </TabPanel>
      </div>
    </>
  )
}

export default Forum
