import { FC, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '@components/TabPanel'
import Events from './components/Events'
import EventsForum from './components/EventsForum'
import { GridSortModel } from '@mui/x-data-grid'

interface Props {}

const EventManagement: FC<Props> = (): JSX.Element => {
  const [value, setValue] = useState(0)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<any[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])

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
    <>
      <div className='w-full h-full px-1 overflow-x-hidden'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'>
            <Tab
              label='Events'
              {...a11yProps(0)}
            />
            <Tab
              label='Events - Forum'
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <TabPanel
          value={value}
          index={0}>
          <Events />
        </TabPanel>

        <TabPanel
          value={value}
          index={1}>
          <EventsForum />
        </TabPanel>
      </div>
    </>
  )
}

export default EventManagement
