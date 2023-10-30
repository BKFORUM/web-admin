import { Tooltip } from '@mui/material'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { formatDateFormDateLocal } from '@utils/functions/formatDay'
import { FC, useCallback, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { IUserForum } from '@interfaces/IUser'
import Table from '@components/Table'

interface Props {
  rowsData: IUserForum[]
  loading: boolean
}

const ForumUserDetail: FC<Props> = ({ ...props }: Props): JSX.Element => {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'fullName',
      sort: 'asc',
    },
  ])

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
      columns={columnsUserForums}
      rows={props.rowsData}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      loading={props.loading}
      hiddenFooter={true}
    />
  )
}

export default ForumUserDetail
