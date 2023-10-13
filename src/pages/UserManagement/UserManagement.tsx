import { Tooltip } from '@material-ui/core'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useEffect, useState } from 'react'
import Table from '@components/Table/Table'
import AddIcon from '@mui/icons-material/Add'
// import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Button from '@components/Button/Button'
import SearchInput from '@components/SearchInput'
import ModalConfirm from '@components/ModalConfirm'
import ModalAddEdit from '@components/ModalAddEdit'
import { formatDayVN } from '@utils/functions/formatDay'
import { useNavigate } from 'react-router-dom'

interface Props {}

interface IUser {
  id: number
  name: string
  email: string
  gender: string
  address: string
  role: string
}

const FakeData = [
  {
    id: 1,
    name: 'Trương Quang Khang',
    email: 'kang@gmail.com',
    gender: 'Male',
    address: '20 Nguyễn Huệ, Đà Nẵng',
    role: 'Student',
  },
  {
    id: 2,
    name: 'Trương Quang Khang',
    email: 'kang@gmail.com',
    gender: 'Male',
    address: '20 Nguyễn Huệ, Đà Nẵng',
    role: 'Teacher',
  },
  {
    id: 3,
    name: 'Trương Quang Khang',
    email: 'kang@gmail.com',
    gender: 'Male',
    address: '20 Nguyễn Huệ, Đà Nẵng',
    role: 'Student',
  },
  {
    id: 4,
    name: 'Trương Quang Khang',
    email: 'kang@gmail.com',
    gender: 'Male',
    address: '20 Nguyễn Huệ, Đà Nẵng',
    role: 'Student',
  },
  {
    id: 5,
    name: 'Trương Quang Khang',
    email: 'kang@gmail.com',
    gender: 'Male',
    address: '20 Nguyễn Huệ, Đà Nẵng',
    role: 'Student',
  },
]

const UserManagement: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IUser[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [rowSelected, setRowSelected] = useState<number | null>(null)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setRowTotal(FakeData.length)
      setRows(FakeData)
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

  const handleAction = (data: any) => {
    console.log(data)
    console.log(formatDayVN(data?.date_of_birth))
  }

  const columnsUser = [
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
      field: 'email',
      headerName: 'Email',
      type: 'string',
      flex: 2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.email}>
          <p className={`text-black line-clamp-1`}>{params.row.email}</p>
        </Tooltip>
      ),
    },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
    },
    {
      field: 'address',
      headerName: 'Address',
      type: 'string',
      minWidth: 100,
      flex: 2,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.address}>
          <p className={`text-black line-clamp-1`}>{params.row.address}</p>
        </Tooltip>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'string',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <p className='text-black bg-slate-200 px-3 py-1 rounded-2xl mr-2 line-clamp-1'>
          {params.row.role}
        </p>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      maxWidth: 120,
      minWidth: 80,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      sortable: false,
      disableSelectionOnClick: false,
      renderCell: (params: GridRenderCellParams<any, any>) => {
        return <BtnAction params={params} />
      },
    },
  ]

  const BtnAction = (params: any) => {
    return (
      <>
        <div className={`flex gap-2`}>
          <VisibilityIcon
            sx={{ cursor: 'pointer', color: '#1278ccf0' }}
            onClick={() => {
              navigate('/user-management/' + params.params.row.id)
            }}
          />
          <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {
              setRowSelected(params.params.row.id)
              setOpenModalDelete(true)
            }}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <div className='flex justify-between items-center '>
          <SearchInput
            value={inputSearch}
            setValue={handleChangeSearch}
          />
          <Button
            typeButton='blue'
            onClick={() => {
              setOpenModalEdit(true)
            }}>
            <div className='flex items-center gap-2'>
              <AddIcon />
              <span>Create</span>
            </div>
          </Button>
        </div>

        <div className='mt-3 w-full overflow-x-hidden'>
          <Table
            columns={columnsUser}
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

      {openModalDelete ? (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          // handleDelete={handleDeleteOrder}
        />
      ) : null}
      {openModalEdit ? (
        <ModalAddEdit
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

export default UserManagement
