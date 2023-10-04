import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Table from '@components/Table'
import SearchInput from '@components/SearchInput'
import Button from '@components/Button/Button'
interface Props {}

interface IRequestForum {
  id: number
  name: string
  creator: string
  categories: string
  create_at: string
}

const FakeData = [
  {
    id: 1,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: 'hoc tap',
    create_at: '1-10-2023 14:02',
  },
  {
    id: 2,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: 'hoc tap',
    create_at: '1-10-2023 14:02',
  },
  {
    id: 3,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: 'hoc tap',
    create_at: '1-10-2023 14:02',
  },
  {
    id: 4,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: 'hoc tap',
    create_at: '1-10-2023 14:02',
  },
  {
    id: 5,
    name: 'Diễn đàng sv khoa IT',
    creator: 'Truong Quang Khang',
    categories: 'hoc tap',
    create_at: '1-10-2023 14:02',
  },
]

const RequestForum: FC<Props> = (props): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IRequestForum[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [rowSelected, setRowSelected] = useState<number | null>(null)

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
    },
    {
      field: 'categories',
      headerName: 'Categories',
      type: 'string',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <p className='text-black bg-slate-200 px-3 py-1 rounded-2xl'>
          {params.row.categories}
        </p>
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
      minWidth: 80,
      flex: 1,
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
      <>
        <div className={`flex gap-2`}>
          <Button typeButton='approve'>Approve</Button>
          <Button typeButton='reject'>Reject</Button>
        </div>
      </>
    )
  }

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
          setRowSelected={setRowSelected}
        />
      </div>
    </div>
  )
}

export default RequestForum
