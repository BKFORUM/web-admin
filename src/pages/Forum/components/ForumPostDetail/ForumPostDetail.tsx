import { Tooltip } from '@mui/material'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { formatDateLocalV2 } from '@utils/functions/formatDay'
import { FC, useCallback, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Table from '@components/Table'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  forumActionSelector,
  forumStateSelector,
  notifyActionSelector,
  postActionSelector,
  postStateSelector,
} from '@store/index'
import ModalConfirm from '@components/ModalConfirm'

interface Props {}

const ForumPostDetail: FC<Props> = (): JSX.Element => {
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { setForumDetail } = useStoreActions(forumActionSelector)
  const { forumDetail } = useStoreState(forumStateSelector)
  const { deletePost, setIsDeletePostSuccess } = useStoreActions(postActionSelector)
  const { messageErrorPost, isDeletePostSuccess } = useStoreState(postStateSelector)
  const [loading, setLoading] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [rowSelected, setRowSelected] = useState<string>('')

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'fullName',
      sort: 'asc',
    },
  ])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const handleDeletePost = async () => {
    setLoading(true)
    const res = await deletePost(rowSelected)
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Delete post successful',
      })
      if (forumDetail !== null) {
        const newData = forumDetail?.posts.filter((item) => {
          return item?.id !== rowSelected
        })
        setForumDetail({ ...forumDetail, posts: newData })
      }
      setOpenModalDelete(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!isDeletePostSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorPost })
      setIsDeletePostSuccess(true)
    }
  }, [isDeletePostSuccess])

  const columnsPostForums = [
    {
      field: 'fullName',
      headerName: 'Creator',
      flex: 2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.user.fullName}>
          <p className={`text-black line-clamp-1`}>{params.row.user.fullName}</p>
        </Tooltip>
      ),
    },
    {
      field: 'totalLike',
      headerName: 'Total like',
      type: 'string',
      flex: 1.5,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <p className={`text-black line-clamp-1`}>{params.row._count.likes}</p>
      ),
    },
    {
      field: 'totalComment',
      headerName: 'Total comment',
      minWidth: 100,
      flex: 1.5,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <p className={`text-black line-clamp-1`}>{params.row._count.comments}</p>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Create at',
      type: 'string',
      minWidth: 50,
      flex: 2,
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
      field: 'action',
      headerName: 'Action',
      flex: 1,
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
        columns={columnsPostForums}
        rows={forumDetail?.posts}
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
          handleDelete={handleDeletePost}
        />
      ) : null}
    </>
  )
}

export default ForumPostDetail
