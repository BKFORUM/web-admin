import { Tooltip } from '@mui/material'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Button from '@components/Button/Button'
import SearchInput from '@components/SearchInput'
import Table from '@components/Table'
import { IEvent } from '@interfaces/IEvent'
import ModalAddEdit from '@components/ModalAddEdit'
import { formatDateTimeLocal } from '@utils/functions/formatDay'

interface Props {}

const Events: FC<Props> = (): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [openModalAddEdit, setOpenModalAddEdit] = useState(false)
  const [rowsData, setRows] = useState<IEvent[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const handleChangeSearch = (value: string): void => {
    setInputSearch(value)
  }

  const handleAction = async (data: any): Promise<void> => {
    console.log(data)
    console.log(formatDateTimeLocal(data?.startTime))
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
      field: 'location',
      headerName: 'Location',
      type: 'string',
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
      field: 'startTime',
      headerName: 'Start Time',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <a className='text-blue-700 cursor-pointer'>{params.row.startTime}</a>
      ),
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <a className='text-blue-700 cursor-pointer'>{params.row.endTime}</a>
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
        <a className='text-blue-700 cursor-pointer'>{params.row.interested}</a>
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
        <a className='text-blue-700 cursor-pointer'>{params.row.status}</a>
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
              // navigate('/forum-management/' + params.params.row.id)
            }}
          />
          <EditIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              // setRowSelected({
              //   ...params.params.row,
              //   moderatorId: params.params.row.moderator.id,
              // })
              // setOpenModalEdit(true)
            }}
          />
          <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {
              // setRowSelected(params.params.row)
              // setOpenModalDelete(true)
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
          <Button
            typeButton='blue'
            onClick={() => {
              // setRowSelected(undefined)
              setOpenModalAddEdit(true)
            }}>
            <div className='flex items-center gap-2'>
              <AddIcon />
              <span>Create</span>
            </div>
          </Button>
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
      {/* {openModalDelete ? (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          handleDelete={handleDelete}
        />
      ) : null} */}
      {openModalAddEdit ? (
        <ModalAddEdit
          loading={loading}
          open={openModalAddEdit}
          rowSelected={undefined}
          handleClose={() => setOpenModalAddEdit(false)}
          handleAction={handleAction}
          page='EVENTS'
        />
      ) : null}
    </>
  )
}

export default Events
