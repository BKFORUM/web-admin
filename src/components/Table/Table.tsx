import { DataGrid, GridSortModel } from '@mui/x-data-grid'
import { Box } from '@mui/material'

interface IProps {
  columns?: any
  rows?: any
  loading?: boolean
  sortable?: any
  totalRow?: number
  sortModel?: any
  paginationModel?: any
  onSortModelChange?: (sortModel: GridSortModel) => void
  onPaginationModelChange?: any
  setRowSelected?: any
}

const Table = ({
  columns,
  rows,
  loading,
  sortModel,
  totalRow,
  onSortModelChange,
  paginationModel,
  onPaginationModelChange,
  setRowSelected,
}: IProps) => {
  return (
    <Box sx={{ mt: '8px', width: '100%', backgroundColor: '#fff' }}>
      <DataGrid
        sx={{
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
            py: '10px',
            display: 'flex',
            alignItems: 'center',
          },
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          height: '100%',
        }}
        rows={rows}
        columns={columns}
        rowCount={totalRow}
        loading={loading}
        sortingMode='server'
        sortModel={sortModel}
        sortingOrder={['asc', 'desc']}
        onSortModelChange={onSortModelChange}
        getRowHeight={() => 'auto'}
        hideFooterSelectedRowCount={true}
        autoHeight
        hideFooterPagination={false}
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        // paginationMode='server'
        onPaginationModelChange={onPaginationModelChange}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids)
          const selectedRows = rows.filter((row: any) => selectedIDs.has(row.id))
          setRowSelected(selectedRows)
        }}
      />
    </Box>
  )
}

export default Table
