import { Tooltip } from '@mui/material'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { formatDateFormDateLocal } from '@utils/functions/formatDay'
import { FC, useCallback, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { IUserForum } from '@interfaces/IUser'
import Table from '@components/Table'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  forumActionSelector,
  forumStateSelector,
  notifyActionSelector,
} from '@store/index'
import { useParams } from 'react-router-dom'
import ModalConfirm from '@components/ModalConfirm'

interface Props {}

const ForumUserDetail: FC<Props> = (): JSX.Element => {
  const { id } = useParams()
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { setForumDetail, deleteUserFromForum, setIsDeleteUserFromForumSuccess } =
    useStoreActions(forumActionSelector)
  const { forumDetail, isDeleteUserFromForumSuccess, messageErrorForum } =
    useStoreState(forumStateSelector)

  const [loading, setLoading] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [rowSelected, setRowSelected] = useState<string>('')

  const userRowsData = forumDetail?.users.map((item: { user: IUserForum }) => item.user)

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'fullName',
      sort: 'asc',
    },
  ])

  const handleDeleteUser = async () => {
    if (id) {
      setLoading(true)
      const res = await deleteUserFromForum({
        id: id,
        userId: rowSelected,
        status: 'DELETED',
      })
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Delete user successful',
        })
        if (forumDetail !== null) {
          const newData = forumDetail?.users.filter((item) => {
            return item.user.id !== rowSelected
          }) as [{ user: IUserForum }]
          setForumDetail({ ...forumDetail, users: newData })
          setOpenModalDelete(false)
        }
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (!isDeleteUserFromForumSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsDeleteUserFromForumSuccess(true)
    }
  }, [isDeleteUserFromForumSuccess])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const columnsUserForums = [
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
      field: 'phoneNumber',
      headerName: 'Phone number',
      minWidth: 100,
      flex: 2,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.phoneNumber}>
          <p className={`text-black line-clamp-1`}>{params.row.phoneNumber}</p>
        </Tooltip>
      ),
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of birth',
      type: 'string',
      minWidth: 50,
      // flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={formatDateFormDateLocal(params.row.dateOfBirth)}>
          <p className={`text-black line-clamp-1`}>
            {formatDateFormDateLocal(params.row.dateOfBirth)}
          </p>
        </Tooltip>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
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
            setRowSelected(params.row.id)
            setOpenModalDelete(true)
          }}
        />
      ),
    },
  ]
  return (
    <>
      <Table
        columns={columnsUserForums}
        rows={userRowsData || []}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        loading={loading}
        hiddenFooter={true}
      />
      {openModalDelete ? (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          handleDelete={handleDeleteUser}
        />
      ) : null}
    </>
  )
}

export default ForumUserDetail
