import Button from '@components/Button/Button'
import { Box } from '@mui/material'
interface IProps {
  handleSubmitAction?: any
  data?: any
  page?: any
  handleClose?: any
}

export default function FooterModal({
  handleSubmitAction,
  data,
  page,
  handleClose,
}: IProps) {
  const checkbtnPage = data?.deliveryOrderNo ? 'UPDATE' : 'CREATE'

  const checkbtnFunction =
    data?.deliveryOrderNo ||
    data?.userId ||
    (data?.supplierId && page === 'CONTACT') ||
    data?.id
      ? 'Update'
      : 'Create'
  return (
    <div>
      <Box
        id='modal-modal-description'
        sx={{
          mt: 6,
          mb: 1,
          display: 'flex',
          gap: 3,
          justifyContent: 'center',
          '& .MuiButtonBase-root': {
            minWidth: '50px',
            lineHeight: 1.25,
          },
        }}>
        <Button
          typeButton='primary'
          type='submit'
          onSubmit={handleSubmitAction}
          disabled={false}
          loading={false}>
          {page === 'PAYABLE' ? checkbtnPage : checkbtnFunction}
        </Button>

        <Button
          type='button'
          onClick={handleClose}
          className='transition-all duration-300 bg-gray-500 hover:bg-gray-800 text-white px-6 py-1.5 shadow rounded-2xl border-none'>
          Cancel
        </Button>
      </Box>
    </div>
  )
}
