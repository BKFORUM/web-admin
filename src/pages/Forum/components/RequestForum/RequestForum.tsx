import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useEffect, useState } from 'react'
import Table from '@components/Table'
import SearchInput from '@components/SearchInput'
import Button from '@components/Button/Button'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'

import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { IRequestForum } from '@interfaces/IForum'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  forumActionSelector,
  forumStateSelector,
  notifyActionSelector,
} from '@store/index'
import { ITopic } from '@interfaces/ITopics'
import { formatDateLocalV2 } from '@utils/functions/formatDay'
interface Props {}

interface IActionMenu {
  params: any
  isUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

function ActionsMenu({ params, isUpdate }: IActionMenu) {
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { updateStatusForum, setIsUpdateStatusForum } =
    useStoreActions(forumActionSelector)
  const { messageErrorForum, isUpdateStatusForumSuccess } =
    useStoreState(forumStateSelector)

  useEffect(() => {
    if (!isUpdateStatusForumSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorForum,
      })
      setIsUpdateStatusForum(true)
    }
  }, [isUpdateStatusForumSuccess])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleApproveClick = async () => {
    setLoading(true)
    const res = await updateStatusForum({ id: params.row.id, status: 'ACTIVE' })
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Approve forum successful',
      })
      isUpdate(false)
      setLoading(false)
    } else {
      isUpdate(true)
      setLoading(false)
    }

    handleClose()
  }

  const handleRejectClick = async () => {
    setLoading(true)
    const res = await updateStatusForum({ id: params.row.id, status: 'DELETED' })
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Reject forum successful',
      })
      isUpdate(false)
      setLoading(false)
    } else {
      isUpdate(true)
      setLoading(false)
    }
    handleClose()
  }

  return (
    <>
      <>
        <div className={`lg:flex gap-2 xs:hidden`}>
          <Button
            loading={loading}
            onClick={handleApproveClick}
            typeButton='approve'>
            Approve
          </Button>
          <Button
            loading={loading}
            onClick={handleRejectClick}
            typeButton='reject'>
            Reject
          </Button>
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
          <MenuItem
            disabled={loading}
            onClick={handleApproveClick}>
            <DoneIcon className='text-green-600' />
            <span className='ml-2 text-green-600'> Approve</span>
          </MenuItem>
          <MenuItem
            disabled={loading}
            onClick={handleRejectClick}>
            <ClearIcon className='text-red-600' />
            <span className='ml-2 text-red-600'> Reject</span>
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

const RequestForum: FC<Props> = (): JSX.Element => {
  const { getAllForum, setIsGetAllForumSuccess } = useStoreActions(forumActionSelector)
  const { messageErrorForum, isGetAllForumSuccess } = useStoreState(forumStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IRequestForum[]>([])
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
  const [loading, setLoading] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(true)

  const getAllRequestForum = async (): Promise<void> => {
    setLoading(true)
    const res = await getAllForum({
      search: inputSearch,
      skip: paginationModel.page * 10,
      take: paginationModel.pageSize,
      isPending: true,
      order: `${sortModel[0]?.field}:${sortModel[0]?.sort}`,
    })
    if (res) {
      console.log(res)
      setRowTotal(res?.totalRecords)
      const data = res?.data?.map((item: any, index: number) => ({
        ...item,
        tag: paginationModel.page * paginationModel.pageSize + index + 1,
      }))
      setRows(data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllRequestForum()
  }, [sortModel, paginationModel])

  useEffect(() => {
    if (!isUpdate) {
      getAllRequestForum()
    }
  }, [isUpdate])

  useEffect(() => {
    if (!isGetAllForumSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsGetAllForumSuccess(true)
    }
  }, [isGetAllForumSuccess])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const handleChangeSearch = (value: string): void => {
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
      field: 'topics',
      headerName: 'Categories',
      minWidth: 100,
      flex: 2,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, string>) =>
        params.row.topics.length > 2 ? (
          <div className='flex'>
            {params.row.topics.slice(0, 2).map((item: ITopic, index: number) => (
              <p
                key={index}
                className='text-black bg-slate-200 px-3 py-1 rounded-2xl mr-2 line-clamp-1'>
                {item.name}
              </p>
            ))}
            <Tooltip
              title={params.row.topics
                .slice(2)
                .map((item: ITopic) => item.name)
                .join(', ')}>
              <p className='text-black bg-slate-200 px-3 py-1 rounded-2xl mr-2 line-clamp-1'>
                + {params.row.topics.length - 2}
              </p>
            </Tooltip>
          </div>
        ) : (
          params.row.topics.map((item: ITopic, index: number) => (
            <p
              key={index}
              className='text-black bg-slate-200 px-3 py-1 rounded-2xl mr-2 line-clamp-1'>
              {item.name}
            </p>
          ))
        ),
    },
    {
      field: 'createdAt',
      headerName: 'Create at',
      type: 'string',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={formatDateLocalV2(params.row.createdAt)}>
          <p className={`text-black line-clamp-1`}>
            {formatDateLocalV2(params.row.createdAt)}
          </p>
        </Tooltip>
      ),
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
        <ActionsMenu
          params={params}
          isUpdate={setIsUpdate}
        />
      ),
    },
  ]
  return (
    <div className='mt-4'>
      <div className='flex justify-between items-center '>
        <SearchInput
          value={inputSearch}
          setValue={handleChangeSearch}
          width='300px'
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
