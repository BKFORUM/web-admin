import { Tooltip } from '@material-ui/core'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useEffect, useState } from 'react'
import Table from '@components/Table/Table'
import AddIcon from '@mui/icons-material/Add'
import { HiDocumentAdd } from 'react-icons/hi'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Button from '@components/Button/Button'
import SearchInput from '@components/SearchInput'
import ModalAddEdit from '@components/ModalAddEdit'
import { useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { notifyActionSelector, userActionSelector, userStateSelector } from '@store/index'
import { IUser } from '@interfaces/IUser'
import { useDebounce } from '@hooks/useDebounce'

interface Props {}

const UserManagement: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const {
    getAllUser,
    setIsGetAllUserSuccess,
    addUser,
    setIsAddUserSuccess,
    importFileUser,
    setIsImportFileUserSuccess,
  } = useStoreActions(userActionSelector)
  const {
    messageErrorUser,
    isGetAllUserSuccess,
    isAddUserSuccess,
    isImportFileUserSuccess,
  } = useStoreState(userStateSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IUser[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'fullName',
      sort: 'asc',
    },
  ])
  const [loading, setLoading] = useState<boolean>(false)
  // const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [rowSelected, setRowSelected] = useState<IUser | undefined>(undefined)

  const getAllUserPage = async (): Promise<void> => {
    setLoading(true)
    const res = await getAllUser({
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
      }))
      setRows(data)
    }
    setLoading(false)
  }
  const debouncedInputValue = useDebounce(inputSearch, 500)

  const addQueryParam = (valueSearch: string): void => {
    const queryParams = new URLSearchParams()
    queryParams.set('search', valueSearch.trim())
    const newURL = `/user-management?${queryParams.toString()}`
    window.history.pushState({}, '', newURL)
  }

  useEffect(() => {
    addQueryParam(inputSearch)
    getAllUserPage()
  }, [sortModel, paginationModel, debouncedInputValue])

  useEffect(() => {
    if (!isGetAllUserSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorUser })
      setIsGetAllUserSuccess(true)
    }
  }, [isGetAllUserSuccess])

  useEffect(() => {
    if (!isAddUserSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorUser })
      setIsAddUserSuccess(true)
    }
  }, [isAddUserSuccess])

  useEffect(() => {
    if (!isImportFileUserSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorUser })
      setIsImportFileUserSuccess(true)
    }
  }, [isImportFileUserSuccess])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const handleChangeSearch = (value: string): void => {
    setInputSearch(value)
  }

  const handleAction = async (data: any): Promise<void> => {
    const yourTime = new Date(data?.dateOfBirth)
    setLoading(true)
    const res = await addUser({ ...data, dateOfBirth: yourTime.toISOString() })
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Add user successful',
      })

      setLoading(false)
    }
    setOpenModalEdit(false)
    setLoading(false)
  }

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && files[0] !== null) {
      const file = files[0]
      const formData = new FormData()
      formData.append(`file`, file)
      setLoading(true)
      const res = await importFileUser(formData)
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Import users successful',
        })
        setPaginationModel({ page: 0, pageSize: 10 })
      }
      setLoading(false)
    }
  }

  const columnsUser = [
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
      field: 'fullName',
      headerName: 'Name',
      flex: 2,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.fullName}>
          <p className={`text-black line-clamp-1`}>{params.row.fullName}</p>
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
      sortable: false,
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
      sortable: false,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.address !== null ? params.row.address : ''}>
          <p className={`text-black line-clamp-1`}>{params.row.address}</p>
        </Tooltip>
      ),
    },
    {
      field: 'type',
      headerName: 'Role',
      sortable: false,
      type: 'string',
      minWidth: 140,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <p className='text-black text-xs bg-slate-200 px-3 py-1 rounded-2xl line-clamp-1'>
          {params.row.type}
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
          {/* <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {
              setRowSelected(params.params.row.id)
              // setOpenModalDelete(true)
            }}
          /> */}
        </div>
      </>
    )
  }

  return (
    <>
      <div className='sticky top-20'>
        <div className='flex justify-between items-center '>
          <div className='flex item-center justify-center'>
            <h4 className='font-bold text-xl my-auto mr-6'>Users</h4>
            <SearchInput
              value={inputSearch}
              setValue={handleChangeSearch}
              width='300px'
            />
          </div>

          <div className='flex items-center gap-4'>
            <div>
              <label
                htmlFor='importExcel'
                className={`${
                  loading && 'pointer-events-none'
                } cursor-pointer flex items-center gap-1.5 bg-[#3367d6] hover:bg-[#1a55d1] text-white py-2 px-4 border border-[#3367d6] rounded shadow `}>
                <HiDocumentAdd className='h-5 w-5' />

                <span>Import</span>
              </label>
              <input
                id='importExcel'
                type='file'
                accept='.xlsx'
                multiple={false}
                className='hidden'
                onChange={handleImportFile}
              />
            </div>
            <Button
              typeButton='blue'
              onClick={() => {
                setOpenModalEdit(true)
                setRowSelected(undefined)
              }}>
              <div className='flex items-center gap-2 '>
                <AddIcon />
                <span>Create</span>
              </div>
            </Button>
          </div>
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

      {/* {openModalDelete ? (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          // handleDelete={handleDeleteOrder}
        />
      ) : null} */}
      {openModalEdit ? (
        <ModalAddEdit
          loading={loading}
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
