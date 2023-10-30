import { Tooltip } from '@material-ui/core'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useEffect, useState } from 'react'
import Table from '@components/Table/Table'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchInput from '@components/SearchInput'
import ModalConfirm from '@components/ModalConfirm'
import { useDebounce } from '@hooks/useDebounce'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { notifyActionSelector, postActionSelector, postStateSelector } from '@store/index'
import { IPost } from '@interfaces/IPost'
import { formatDateLocalV2 } from '@utils/functions/formatDay'

interface Props {}

const PostManagement: FC<Props> = (): JSX.Element => {
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { getAllPost, setIsGetAllPostSuccess, deletePost, setIsDeletePostSuccess } =
    useStoreActions(postActionSelector)
  const { isGetAllPostSuccess, messageErrorPost, isDeletePostSuccess } =
    useStoreState(postStateSelector)

  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IPost[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'content',
      sort: 'asc',
    },
  ])
  const [loading, setLoading] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [rowSelected, setRowSelected] = useState<string>('')

  const getAllPostPage = async (): Promise<void> => {
    setLoading(true)
    const res = await getAllPost({
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
        totalLike: 40,
        totalComment: 40,
      }))
      setRows(data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const debouncedInputValue = useDebounce(inputSearch, 500)

  const addQueryParam = (valueSearch: string): void => {
    const queryParams = new URLSearchParams()
    queryParams.set('search', valueSearch.trim())
    const newURL = `/post-management?${queryParams.toString()}`
    window.history.pushState({}, '', newURL)
  }

  useEffect(() => {
    addQueryParam(inputSearch)
    getAllPostPage()
  }, [paginationModel, debouncedInputValue, sortModel])

  useEffect(() => {
    if (!isGetAllPostSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorPost })
      setIsGetAllPostSuccess(true)
    }
  }, [isGetAllPostSuccess])

  useEffect(() => {
    if (!isDeletePostSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorPost })
      setIsDeletePostSuccess(true)
    }
  }, [isDeletePostSuccess])

  const handleChangeSearch = (value: string): void => {
    setInputSearch(value)
  }

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    if (newSortModel.length > 0) {
      setSortModel(newSortModel)
    }
  }, [])

  const handleDeletePost = async () => {
    const res = await deletePost(rowSelected)
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Delete post successful',
      })
      setOpenModalDelete(false)
      getAllPostPage()
    }
  }

  const columnsPost = [
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
        <Tooltip title={params.row.forum.name}>
          <p className={`text-black line-clamp-1`}>{params.row.forum.name}</p>
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
        <Tooltip title={params.row.user.fullName}>
          <p className={`text-black line-clamp-1`}>{params.row.user.fullName}</p>
        </Tooltip>
      ),
    },
    {
      field: 'totalComment',
      headerName: 'Total comment',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'totalLike',
      headerName: 'Total like',
      type: 'string',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      sortable: false,
      hideable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Create at',
      type: 'string',
      flex: 2,
      minWidth: 140,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      sortable: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={formatDateLocalV2(params.row.createdAt)}>
          <p className='text-black '>{formatDateLocalV2(params.row.createdAt)}</p>
        </Tooltip>
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
          <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {
              console.log(params)
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
        <div className='flex justify-start items-center '>
          <SearchInput
            value={inputSearch}
            setValue={handleChangeSearch}
          />
        </div>

        <div className='mt-3 w-full overflow-x-hidden'>
          <Table
            columns={columnsPost}
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
          handleDelete={handleDeletePost}
        />
      ) : null}
    </>
  )
}

export default PostManagement
