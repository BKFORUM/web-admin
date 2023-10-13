import Button from '@components/Button/Button'
import SearchInput from '@components/SearchInput'
import Table from '@components/Table/Table'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { FC, useCallback, useEffect, useState } from 'react'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import ModalConfirm from '@components/ModalConfirm'
import ModalAddEdit from '@components/ModalAddEdit'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@material-ui/core'

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
    moderator: 'Lê Thị Mỹ Hạnh',
    total_members: 40,
    event: 40,
  },
  {
    id: 5,
    forum: '20TCLC_DT3',
    moderator: 'Trương Quang Khang',
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
    id: 13,
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
    moderator: 'Nguyễn Văn B',
    total_members: 40,
    event: 40,
  },
  {
    id: 18,
    forum: '20TCLC_DT3',
    moderator: 'Nguyễn Văn A',
    total_members: 40,
    event: 40,
  },
  {
    id: 19,
    forum: '20TCLC_DT3',
    moderator: 'Nguyễn Văn Thịnh',
    total_members: 40,
    event: 40,
  },
]

interface Props {}

const ForumTab: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IForum[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
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
    setSortModel(newSortModel)
    if (newSortModel[0].field === 'moderator') {
      console.log('moderator.fullName:' + newSortModel[0].sort)
    } else {
      console.log(newSortModel[0].field + ':' + newSortModel[0].sort)
    }
    // Here you save the data you need from the sort model
  }, [])

  const handleChangeSearch = (value: string): void => {
    console.log(value)
    setInputSearch(value)
  }

  const handleDeleteOrder = async () => {
    setOpenModalDelete(false)
  }

  const handleAction = (data: any) => {
    console.log(data)
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
      field: 'forum',
      headerName: 'Forum',
      flex: 2,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.forum}>
          <p className={`text-black line-clamp-1`}>{params.row.forum}</p>
        </Tooltip>
      ),
    },
    {
      field: 'moderator',
      headerName: 'Moderator',
      type: 'string',
      flex: 2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.moderator}>
          <p className={`text-black line-clamp-1`}>{params.row.moderator}</p>
        </Tooltip>
      ),
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
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <a className='text-blue-700 cursor-pointer'>{params.row.event}</a>
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
              navigate('/forum-management/' + params.params.row.id)
            }}
          />
          <EditIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setRowSelected(params.params.row.id)
              setOpenModalEdit(true)
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
              // setLoading(true)
              // setTimeout(() => {
              //   setRows(FakeData.slice(0, 5))
              //   setLoading(false)
              // }, 2000)
              setRowSelected(null)
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
      {openModalDelete ? (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          handleDelete={handleDeleteOrder}
        />
      ) : null}
      {openModalEdit ? (
        <ModalAddEdit
          open={openModalEdit}
          rowSelected={rowSelected}
          handleClose={() => setOpenModalEdit(false)}
          handleAction={handleAction}
          page='FORUM'
        />
      ) : null}
    </>
  )
}

export default ForumTab
