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
            py: '8px',
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
          // height: '100%',
          '& .MuiDataGrid-footerContainer': {
            display: `${hiddenFooter ? 'none' : ''}`,
          },
          '& .MuiDataGrid-virtualScroller': {
            height: `${hiddenFooter && rows.length > 4 ? '280px' : ''}`,
            overflow: `${hiddenFooter && rows.length > 4 ? 'overlay !important' : ''}`,
            scrollbarGutter: 'stable',
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
