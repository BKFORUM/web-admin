import Button from '@components/Button/Button'
import SearchInput from '@components/SearchInput'
import Table from '@components/Table/Table'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { FC, useCallback, useEffect, useState } from 'react'
import { GridSortModel } from '@mui/x-data-grid'
import ModalConfirm from '@components/ModalConfirm'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '@components/TabPanel'
interface IForum {
  id: number
  forum: string
  moderator: string
  total_members: number
  event: number
}

const FakeData = [
  {
    id: 1,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 2,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 3,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 4,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 5,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 6,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 7,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 8,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 9,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 10,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 11,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 12,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 20,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 14,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 15,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 16,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 17,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 18,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
  {
    id: 19,
    forum: '20TCLC_DT3',
    moderator: 'Võ Đức Hoàng',
    total_members: 40,
    event: 40,
  },
]

interface Props {}

const Forum: FC<Props> = (): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IForum[]>([])
  const [rowTotal, setRowTotal] = useState(10)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handlePagination = () => {
    console.log(1)
  }

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    console.log(newSortModel)
    setSortModel(newSortModel)
    // Here you save the data you need from the sort model
  }, [])

  const handleChangeSearch = (value: string): void => {
    console.log(value)
    setInputSearch(value)
  }

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setRows(FakeData)
      setLoading(false)
    }, 2000)
  }, [])

  const columnsOrder = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
      maxWidth: 50,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
    },
    {
      field: 'forum',
      headerName: 'Forum',
      flex: 2,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
    },
    {
      field: 'moderator',
      headerName: 'Moderator',
      type: 'number',
      flex: 2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
    },
    {
      field: 'total_members',
      headerName: 'Total Member',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
    },
    {
      field: 'event',
      headerName: 'Event',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      maxWidth: 80,
      minWidth: 80,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      sortable: false,
      disableSelectionOnClick: false,
      renderCell: () => {
        return <BtnAction />
      },
    },
  ]

  const BtnAction = ({}) => {
    return (
      <div className={`action_btn`}>
        <EditIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            console.log(1)
          }}
        />
        <DeleteIcon
          sx={{ color: '#d32f2f', cursor: 'pointer' }}
          onClick={() => {
            setOpenModalDelete(true)
          }}
        />
      </div>
    )
  }

  const handleDeleteOrder = async () => {
    setOpenModalDelete(false)
  }

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <div className='w-full h-full px-1'>
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
              label='Duyet Bai'
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <TabPanel
          value={value}
          index={0}>
          <div className='flex justify-between items-center '>
            <SearchInput
              value={inputSearch}
              setValue={handleChangeSearch}
            />
            <Button
              typeButton='blue'
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  setRows(FakeData.slice(0, 5))
                  setLoading(false)
                }, 2000)
              }}>
              <div className='flex items-center gap-2'>
                <AddIcon />
                <span>Create</span>
              </div>
            </Button>
          </div>

          <div className='mt-3 w-full overflow-y-hidden'>
            <Table
              columns={columnsOrder}
              rows={rowsData}
              sortModel={sortModel}
              onSortModelChange={handleSortModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={handlePagination}
              loading={loading}
              totalRow={rowTotal}
              getRowId={(row: any) => {
                console.log(row.id)
                return row.id
              }}
            />
          </div>
        </TabPanel>

        <TabPanel
          value={value}
          index={1}>
          <span>Nhung bai cho duyet</span>
        </TabPanel>
      </div>
      {openModalDelete ? (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          handleDelete={handleDeleteOrder}
        />
      ) : null}
    </>
  )
}

export default Forum
