import { Tooltip } from '@mui/material'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { formatDateLocalV2 } from '@utils/functions/formatDay'
import { FC, useCallback, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Table from '@components/Table'
import { IPostForum } from '@interfaces/IPost'

interface Props {
  rowsData: IPostForum[]
  loading: boolean
}

const ForumPostDetail: FC<Props> = ({ ...props }: Props): JSX.Element => {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'fullName',
      sort: 'asc',
    },
  ])

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])
  const columnsPostForums = [
    {
      field: 'fullName',
      headerName: 'Creator',
      flex: 2,
      minWidth: 150,
      editable: false,
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
      field: 'totalLike',
      headerName: 'Total like',
      type: 'string',
      flex: 2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <p className={`text-black line-clamp-1`}>{params.row._count.likes}</p>
      ),
    },
    {
      field: 'totalComment',
      headerName: 'Total comment',
      minWidth: 100,
      flex: 2,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <p className={`text-black line-clamp-1`}>{params.row._count.comments}</p>
      ),
    },
    {
      field: 'createAt',
      headerName: 'Create at',
      type: 'string',
      minWidth: 50,
      // flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={formatDateLocalV2(params.row.createAt)}>
          <p className={`text-black line-clamp-1`}>
            {formatDateLocalV2(params.row.createAt)}
          </p>
        </Tooltip>
      ),
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
    <Table
      columns={columnsPostForums}
      rows={props.rowsData}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      loading={props.loading}
      hiddenFooter={true}
    />
  )
}

export default ForumPostDetail
