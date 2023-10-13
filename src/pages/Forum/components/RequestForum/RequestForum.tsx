import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useEffect, useState } from 'react'
import Table from '@components/Table'
import SearchInput from '@components/SearchInput'
import Button from '@components/Button/Button'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'

import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
interface Props {}
interface IRequestForum {
  id: number
  name: string
  creator: string
  categories: string[]
  create_at: string
}

const FakeData = [
  {
    id: 1,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: ['hoc tap'],
    create_at: '1-10-2023',
  },
  {
    id: 2,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: ['hoc tap'],
    create_at: '1-10-2023',
  },
  {
    id: 3,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: ['hoc tap'],
    create_at: '1-10-2023',
  },
  {
    id: 4,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: ['hoc tap', 'the thao', 'am nhac', 'xa hoi'],
    create_at: '1-10-2023',
  },
  {
    id: 5,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: ['hoc tap', 'game'],
    create_at: '1-10-2023',
  },
]

function ActionsMenu({ params }: any) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAddClick = () => {
    console.log(`Add clicked for item with ID ${params.row.id}`)
    handleClose()
  }

  const handleEditClick = () => {
    console.log(`Edit clicked for item with ID ${params.row.id}`)
    handleClose()
  }

  return (
    <>
      <>
        <div className={`lg:flex gap-2 xs:hidden`}>
          <Button typeButton='approve'>Approve</Button>
          <Button typeButton='reject'>Reject</Button>
        </div>
      </>
      <div className='xs:block lg:hidden'>
        <IconButton
          aria-label='Actions'
          aria-controls='actions-menu'
          aria-haspopup='true'
          onClick={handleClick}>
          <MoreVertOutlinedIcon />
        </IconButton>
        <Menu
          id='actions-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleAddClick}>
            <DoneIcon className='text-green-600' />
            <span className='ml-2 text-green-600'> Approve</span>
          </MenuItem>
          <MenuItem onClick={handleEditClick}>
            <ClearIcon className='text-red-600' />
            <span className='ml-2 text-red-600'> Reject</span>
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

const RequestForum: FC<Props> = (): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IRequestForum[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const newData = FakeData.map((item, index) => ({
      ...item,
      tag: paginationModel.page * paginationModel.pageSize + index + 1,
    }))
    setTimeout(() => {
      setRowTotal(FakeData.length)
      setRows(newData)
      setLoading(false)
    }, 2000)
  }, [])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    console.log(newSortModel)
    setSortModel(newSortModel)
    // Here you save the data you need from the sort model
  }, [])

  const handleChangeSearch = (value: string): void => {
    console.log(value)
    setInputSearch(value)
  }

  const columnsForums = [
    {
      field: 'tag',
      headerName: 'Tag',
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
      field: 'name',
      headerName: 'Name',
      flex: 2,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.name}>
          <p className={`text-black line-clamp-1`}>{params.row.name}</p>
        </Tooltip>
      ),
    },
    {
      field: 'creator',
      headerName: 'Creator',
      type: 'string',
      flex: 2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.creator}>
          <p className={`text-black line-clamp-1`}>{params.row.creator}</p>
        </Tooltip>
      ),
    },
    {
      field: 'categories',
      headerName: 'Categories',
      minWidth: 100,
      flex: 2,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) =>
        params.row.categories.length > 2 ? (
          <div className='flex'>
            {params.row.categories.slice(0, 2).map((item: string, index: number) => (
              <p
                key={index}
                className='text-black bg-slate-200 px-3 py-1 rounded-2xl mr-2 line-clamp-1'>
                {item}
              </p>
            ))}
            <Tooltip title={params.row.categories.slice(2).join(', ')}>
              <p className='text-black bg-slate-200 px-3 py-1 rounded-2xl mr-2 line-clamp-1'>
                + {params.row.categories.length - 2}
              </p>
            </Tooltip>
          </div>
        ) : (
          params.row.categories.map((item: string, index: number) => (
            <p
              key={index}
              className='text-black bg-slate-200 px-3 py-1 rounded-2xl mr-2 line-clamp-1'>
              {item}
            </p>
          ))
        ),
    },
    {
      field: 'create_at',
      headerName: 'Create at',
      type: 'string',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1.5,
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      disableSelectionOnClick: false,
      renderCell: (params: GridRenderCellParams<any, any>) => (
        <ActionsMenu params={params} />
      ),
    },
  ]
  return (
    <div>
      <div className='flex justify-between items-center '>
        <SearchInput
          value={inputSearch}
          setValue={handleChangeSearch}
        />
      </div>

      <div className='mt-3 w-full overflow-x-hidden'>
        <Table
          columns={columnsForums}
          rows={rowsData}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          totalRow={rowTotal}
        />
      </div>
    </div>
  )
}

export default RequestForum
