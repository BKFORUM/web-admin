import { Tooltip } from '@material-ui/core'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { FC, useCallback, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import Table from '@components/Table'
import Button from '@components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { AiOutlineUserAdd } from 'react-icons/ai'
import ModalAddEdit from '@components/ModalAddEdit'

interface Props {}

interface IUser {
  id: number
  name: string
  email: string
  phone_number: string
  date_of_birth: string
}

const FakeData = [
  {
    id: 1,
    name: 'Diễn đàng sv khoa IT',
    email: '102200175@sv1.dut.dn.vn',
    phone_number: '03262541254',
    date_of_birth: '1-10-2023',
  },
  {
    id: 2,
    name: 'Diễn đàng sv khoa IT',
    email: '102200175@sv1.dut.dn.vn',
    phone_number: '03262541254',
    date_of_birth: '1-10-2023',
  },
  {
    id: 3,
    name: 'Diễn đàng sv khoa IT',
    email: '102200175@sv1.dut.dn.vn',
    phone_number: '03262541254',
    date_of_birth: '1-10-2023',
  },
  {
    id: 4,
    name: 'Diễn đàng sv khoa IT',
    email: '102200175@sv1.dut.dn.vn',
    phone_number: '03262541254',
    date_of_birth: '1-10-2023',
  },
  {
    id: 5,
    name: 'Diễn đàng sv khoa IT',
    email: '102200175@sv1.dut.dn.vn',
    phone_number: '03262541254',
    date_of_birth: '1-10-2023',
  },
  {
    id: 6,
    name: 'Diễn đàng sv khoa IT',
    email: '102200175@sv1.dut.dn.vn',
    phone_number: '03262541254',
    date_of_birth: '1-10-2023',
  },
  {
    id: 7,
    name: 'Diễn đàng sv khoa IT',
    email: '102200175@sv1.dut.dn.vn',
    phone_number: '03262541254',
    date_of_birth: '1-10-2023',
  },
  {
    id: 8,
    name: 'Diễn đàng sv khoa IT',
    email: '102200175@sv1.dut.dn.vn',
    phone_number: '03262541254',
    date_of_birth: '1-10-2023',
  },

  // {
  //   id: 9,
  //   name: 'Diễn đàng sv khoa IT',
  //   email: '102200175@sv1.dut.dn.vn',
  //   phone_number: '03262541254',
  //   date_of_birth: '1-10-2023',
  // },
  // {
  //   id: 10,
  //   name: 'Diễn đàng sv khoa IT',
  //   email: '102200175@sv1.dut.dn.vn',
  //   phone_number: '03262541254',
  //   date_of_birth: '1-10-2023',
  // },
  // {
  //   id: 11,
  //   name: 'Diễn đàng sv khoa IT',
  //   email: '102200175@sv1.dut.dn.vn',
  //   phone_number: '03262541254',
  //   date_of_birth: '1-10-2023',
  // },
]

const ViewForum: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const [rowsData, setRows] = useState<IUser[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('members')
  const [openModalEdit, setOpenModalEdit] = useState(false)

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

  const columnsForums = [
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
      field: 'phone_number',
      headerName: 'Phone number',
      minWidth: 100,
      flex: 2,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.phone_number}>
          <p className={`text-black line-clamp-1`}>{params.row.phone_number}</p>
        </Tooltip>
      ),
    },
    {
      field: 'date_of_birth',
      headerName: 'Date of birth',
      type: 'string',
      minWidth: 50,
      // flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      // flex: 1,
      minWidth: 20,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      disableSelectionOnClick: false,
      renderCell: (params: GridRenderCellParams<any, any>) => (
        <DeleteIcon
          sx={{ color: '#d32f2f', cursor: 'pointer' }}
          onClick={() => {
            console.log(params.row.id)
          }}
        />
      ),
    },
  ]
  return (
    <>
      <div className='flex flex-col px-1 h-full'>
        <h2 className='font-semibold text-xl'>
          <ArrowBackIosOutlinedIcon
            onClick={() => navigate('/')}
            sx={{ fontSize: 20, marginBottom: 0.2, marginRight: 2, cursor: 'pointer' }}
          />
          Forum: <span className='ml-4  text-[#3E9FDA]'>20TCLC_DT4</span>
        </h2>
        <div className='my-8 grid xs:grid-cols-2 md:grid-cols-4 gap-4'>
          <div
            onClick={() => setTab('members')}
            className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
              tab === 'members' && 'border-none bg-[#3E9FDA]'
            }`}>
            <span
              className={`text-lg text-[#3E9FDA] font-bold ${
                tab === 'members' && 'text-white'
              }`}>
              40
            </span>
            <span className={`${tab === 'members' && 'text-white'}`}>Members</span>
          </div>
          <div
            onClick={() => setTab('posts')}
            className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
              tab === 'posts' && 'border-none bg-[#3E9FDA]'
            }`}>
            <span
              className={`text-lg text-[#3E9FDA] font-bold ${
                tab === 'posts' && 'text-white'
              }`}>
              22
            </span>
            <span className={`${tab === 'posts' && 'text-white'}`}>Post</span>
          </div>
          <div
            onClick={() => setTab('events')}
            className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
              tab === 'events' && 'border-none bg-[#3E9FDA]'
            }`}>
            <span
              className={`text-lg text-[#3E9FDA] font-bold ${
                tab === 'events' && 'text-white'
              }`}>
              24
            </span>
            <span className={`${tab === 'events' && 'text-white'}`}>Events</span>
          </div>
          <div
            onClick={() => setTab('moderator')}
            className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
              tab === 'moderator' && 'border-none bg-[#3E9FDA]'
            }`}>
            <span
              className={`text-lg text-[#3E9FDA] font-bold ${
                tab === 'moderator' && 'text-white'
              }`}>
              1
            </span>
            <span className={`${tab === 'moderator' && 'text-white'}`}>Moderator</span>
          </div>
        </div>

        <div className=' w-full overflow-x-hidden'>
          {tab === 'members' && (
            <Table
              columns={columnsForums}
              rows={rowsData}
              sortModel={sortModel}
              onSortModelChange={handleSortModelChange}
              loading={loading}
              totalRow={rowTotal}
              hiddenFooter={true}
            />
          )}
          {tab === 'posts' && <span>Posts</span>}
          {tab === 'events' && <span>Events</span>}
          {tab === 'moderator' && <span>Moderator</span>}
        </div>
      </div>
      <div className='mt-auto  flex'>
        {/* <Button
          typeButton='blue'
          onClick={() => navigate('/')}
          className='mr-auto bg-slate-400 rounded-xl border-none '>
          Back
        </Button> */}
        {tab === 'members' && (
          <Button
            typeButton='blue'
            onClick={() => setOpenModalEdit(true)}
            className='ml-auto rounded-xl'>
            <AiOutlineUserAdd style={{ fontSize: '24px' }} />
            <span className='ml-2'>Add members</span>
          </Button>
        )}
      </div>
      <ModalAddEdit
        open={openModalEdit}
        handleClose={() => setOpenModalEdit(false)}
        // handleAction={handleAction}
        page='VIEW_FORUM'
      />
    </>
  )
}

export default ViewForum
