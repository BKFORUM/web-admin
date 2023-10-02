import { DataGrid, GridSortModel } from '@mui/x-data-grid'
import { Box } from '@mui/material'

interface IProps {
  columns?: any
  rows?: any
  getRowId?: any
  loading?: boolean
  sortable?: any
  totalRow?: number
  sortModel?: any
  paginationModel?: any
  onSortModelChange?: (sortModel: GridSortModel) => void
  onPaginationModelChange?: any
}

const Table = ({
  columns,
  rows,
  loading,
  sortModel,
  totalRow,
  getRowId,
  onSortModelChange,
  paginationModel,
  onPaginationModelChange,
}: IProps) => {
  return (
    <Box sx={{ mt: '8px', width: '100%', backgroundColor: '#fff' }}>
      <DataGrid
        sx={{
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '10px' },
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
        }}
        rows={rows}
        getRowId={getRowId}
        columns={columns}
        rowCount={totalRow}
        loading={loading}
        sortingMode='server'
        sortModel={sortModel}
        sortingOrder={['asc', 'desc']}
        onSortModelChange={onSortModelChange}
        getRowHeight={() => 'auto'}
        hideFooterSelectedRowCount={true}
        autoHeight={true}
        hideFooterPagination={false}
        // paginationMode='server'
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        autoPageSize
        onPaginationModelChange={onPaginationModelChange}
      />
    </Box>
  )
}

export default Table
