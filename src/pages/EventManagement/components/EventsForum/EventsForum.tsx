import { Tooltip } from '@mui/material'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SearchInput from '@components/SearchInput'
import Table from '@components/Table'
import { IEvent } from '@interfaces/IEvent'
import { formatDateLocalV2 } from '@utils/functions/formatDay'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  eventActionSelector,
  eventStateSelector,
  notifyActionSelector,
} from '@store/index'
import ModalConfirm from '@components/ModalConfirm'
import { useDebounce } from '@hooks/useDebounce'
import ModalDetailEvent from '@components/ModalDetailEvent'

interface Props {}

const EventsForum: FC<Props> = (): JSX.Element => {
  const searchParams = new URLSearchParams(window.location.search)
  const search = searchParams.get('search')
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { getAllEvent, setIsGetAllEventSuccess, setIsDeleteEventSuccess, deleteEvent } =
    useStoreActions(eventActionSelector)
  const { isGetAllEventSuccess, messageError, isDeleteEventSuccess } =
    useStoreState(eventStateSelector)

  const [inputSearch, setInputSearch] = useState<string>(search !== null ? search : '')
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalDetailEvent, setOpenModalDetailEvent] = useState(false)
  const [rowsData, setRows] = useState<IEvent[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'startAt',
      sort: 'asc',
    },
  ])
  const [rowSelected, setRowSelected] = useState<IEvent | undefined>(undefined)

  const debouncedInputValue = useDebounce(inputSearch, 500)

  const addQueryParam = (valueSearch: string): void => {
    const queryParams = new URLSearchParams()
    queryParams.set('search', valueSearch.trim())
    const newURL = `/event-management?${queryParams.toString()}`
    window.history.pushState({}, '', newURL)
  }

  const getAllEventForum = async (): Promise<void> => {
    setLoading(true)
    const res = await getAllEvent({
      search: inputSearch,
      skip: paginationModel.page * 10,
      take: paginationModel.pageSize,
      order: `${sortModel[0]?.field}:${sortModel[0]?.sort}`,
      type: 'FORUM',
    })
    if (res) {
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
    addQueryParam(inputSearch)
    getAllEventForum()
  }, [sortModel, paginationModel, debouncedInputValue])

  useEffect(() => {
    if (!isGetAllEventSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageError })
      setIsGetAllEventSuccess(true)
    }
  }, [isGetAllEventSuccess])

  useEffect(() => {
    if (!isDeleteEventSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageError })
      setIsDeleteEventSuccess(true)
    }
  }, [isDeleteEventSuccess])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const handleChangeSearch = (value: string): void => {
    setInputSearch(value)
  }

  const handleDelete = async () => {
    const res = await deleteEvent(String(rowSelected?.id))
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Delete Event successful',
      })
      getAllEventForum()
    }
    setOpenModalDelete(false)
  }

  const columnsEvents = [
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
      field: 'displayName',
      headerName: 'Name',
      flex: 2,
      minWidth: 150,
      sortable: false,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.displayName}>
          <p className={`text-black line-clamp-1`}>{params.row.displayName}</p>
        </Tooltip>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      type: 'string',
      sortable: false,
      flex: 2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.location}>
          <p className={`text-black line-clamp-1`}>{params.row.location}</p>
        </Tooltip>
      ),
    },
    {
      field: 'startAt',
      headerName: 'Start Time',
      type: 'number',
      minWidth: 100,
      flex: 1.5,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={formatDateLocalV2(params.row.startAt)}>
          <a className='cursor-pointer'>{formatDateLocalV2(params.row.startAt)}</a>
        </Tooltip>
      ),
    },
    {
      field: 'endAt',
      headerName: 'End Time',
      type: 'number',
      minWidth: 100,
      flex: 1.5,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      sortable: false,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={formatDateLocalV2(params.row.endAt)}>
          <a className=' cursor-pointer'>{formatDateLocalV2(params.row.endAt)}</a>
        </Tooltip>
      ),
    },

    {
      field: 'interested',
      headerName: 'Interested',
      type: 'number',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <a className=' cursor-pointer '>{params.row._count.users}</a>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'number',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <>
          {params.row.status === 'UPCOMING' && (
            <span className='px-2 py-1 bg-slate-100 rounded-3xl text-xs'>
              {params.row.status}
            </span>
          )}

          {params.row.status === 'DONE' && (
            <span className='px-2 py-1 bg-gray-300 rounded-3xl text-xs'>
              {params.row.status}
            </span>
          )}

          {params.row.status === 'HAPPENING' && (
            <span className='px-2 py-1 bg-red-200 rounded-3xl text-xs'>
              {params.row.status}
            </span>
          )}
        </>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      // maxWidth: 130,
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
              setRowSelected(params.params.row)
              setOpenModalDetailEvent(true)
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
            width='300px'
          />
        </div>

        <div className='mt-3 w-full overflow-x-hidden'>
          <Table
            columns={columnsEvents}
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

      {openModalDetailEvent && (
        <ModalDetailEvent
          item={rowSelected}
          open={openModalDetailEvent}
          setOpen={setOpenModalDetailEvent}
        />
      )}
    </>
  )
}

export default EventsForum
