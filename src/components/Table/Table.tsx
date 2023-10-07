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
  hiddenFooter?: any
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
  hiddenFooter,
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
          '& .MuiDataGrid-footerContainer': {
            display: `${hiddenFooter ? 'none' : 'block'}`,
          },
          '& .MuiDataGrid-virtualScroller': {
            height: `${hiddenFooter && rows.length > 8 ? '400px' : 'auto'}`,
            overflowY: `${
              hiddenFooter && rows.length > 8 ? 'scroll !important' : 'auto'
            }`,
            overflowX: 'hidden',
          },
        }}
        rows={rows}
        columns={columns}
        rowCount={totalRow}
        loading={loading}
        sortingMode='server'
        sortModel={sortModel}
        sortingOrder={['asc', 'desc']}
        onSortModelChange={onSortModelChange}
        hideFooterSelectedRowCount={true}
        hideFooterPagination={hiddenFooter}
        getRowHeight={() => 'auto'}
        autoHeight
        pageSizeOptions={[10]}
        // paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
      />
    </Box>
  )
}

export default Table
