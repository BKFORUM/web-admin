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
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  forumActionSelector,
  forumStateSelector,
  notifyActionSelector,
} from '@store/index'
import { IForumTab } from '@interfaces/IForum'
import { useDebounce } from '@hooks/useDebounce'
import { ITopic } from '@interfaces/ITopics'

interface Props {}

const ForumTab: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(window.location.search)
  const search = searchParams.get('search')

  const {
    getAllForum,
    addForum,
    setIsGetAllForumSuccess,
    setIsAddForumSuccess,
    editForum,
    setIsEditForumSuccess,
    deleteForum,
    setIsDeleteForumSuccess,
  } = useStoreActions(forumActionSelector)
  const {
    messageErrorForum,
    isGetAllForumSuccess,
    isAddForumSuccess,
    isEditForumSuccess,
    isDeleteForumSuccess,
  } = useStoreState(forumStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)

  const [inputSearch, setInputSearch] = useState<string>(search !== null ? search : '')
  const [rowsData, setRows] = useState<IForumTab[]>([])
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
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [rowSelected, setRowSelected] = useState<IForumTab | undefined>(undefined)

  const debouncedInputValue = useDebounce(inputSearch, 500)

  const addQueryParam = (valueSearch: string): void => {
    const queryParams = new URLSearchParams()
    queryParams.set('search', valueSearch.trim())
    const newURL = `/forum-management?${queryParams.toString()}`
    window.history.pushState({}, '', newURL)
  }

  const getAllForumTab = async (): Promise<void> => {
    setLoading(true)
    const res = await getAllForum({
      search: inputSearch,
      skip: paginationModel.page * 10,
      take: paginationModel.pageSize,
      order: `${sortModel[0]?.field}:${sortModel[0]?.sort}`,
    })
    if (res) {
      setRowTotal(res?.totalRecords)
      const data = res?.data?.map((item: any, index: number) => ({
        ...item,
        tag: paginationModel.page * paginationModel.pageSize + index + 1,
        topicIds: item?.topics.map((topic: ITopic) => topic.id),
        total_members: 40,
        event: 40,
      }))
      setRows(data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isGetAllForumSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsGetAllForumSuccess(true)
    }
  }, [isGetAllForumSuccess])

  useEffect(() => {
    if (!isAddForumSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsAddForumSuccess(true)
    }
  }, [isAddForumSuccess])

  useEffect(() => {
    if (!isEditForumSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsEditForumSuccess(true)
    }
  }, [isEditForumSuccess])

  useEffect(() => {
    if (!isDeleteForumSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsDeleteForumSuccess(true)
    }
  }, [isDeleteForumSuccess])

  useEffect(() => {
    addQueryParam(inputSearch)
    getAllForumTab()
  }, [sortModel, paginationModel, debouncedInputValue])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const handleChangeSearch = (value: string): void => {
    setInputSearch(value)
  }

  const handleDelete = async () => {
    const res = await deleteForum(String(rowSelected?.id))
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Delete forum successful',
      })
      getAllForumTab()
    }
    setOpenModalDelete(false)
  }

  const handleAction = async (data: any): Promise<void> => {
    setLoading(true)
    if (rowSelected !== undefined) {
      const res = await editForum(data)
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Edit forum successful',
        })
        getAllForumTab()
      }
    } else {
      const res = await addForum(data)
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Add forum successful',
        })
        getAllForumTab()
      }
    }
    setLoading(false)
    setOpenModalEdit(false)
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
      field: 'moderator',
      headerName: 'Moderator',
      type: 'string',
      flex: 2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.moderator.fullName}>
          <p className={`text-black line-clamp-1`}>{params.row.moderator.fullName}</p>
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
              setRowSelected({
                ...params.params.row,
                moderatorId: params.params.row.moderator.id,
              })
              setOpenModalEdit(true)
            }}
          />
          <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {
              setRowSelected(params.params.row)
              setOpenModalDelete(true)
            }}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div className='mt-4'>
        <div className='flex justify-between items-center '>
          <SearchInput
            value={inputSearch}
            setValue={handleChangeSearch}
          />
          <Button
            typeButton='blue'
            onClick={() => {
              setRowSelected(undefined)
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
          handleDelete={handleDelete}
        />
      ) : null}
      {openModalEdit ? (
        <ModalAddEdit
          loading={loading}
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
