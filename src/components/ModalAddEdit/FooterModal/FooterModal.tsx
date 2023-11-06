import Button from '@components/Button/Button'
import { Box } from '@mui/material'
interface IProps {
  handleSubmitAction: (data: any) => Promise<void>
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  isEdit?: boolean
  loading: boolean
}

export default function FooterModal({
  handleSubmitAction,
  handleClose,
  isEdit,
  loading,
}: IProps) {
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
          disabled={loading}
          loading={loading}>
          {isEdit ? 'Save' : 'Add'}
        </Button>

        <Button
          type='button'
          onClick={() => handleClose(false)}
          className='transition-all duration-300 bg-gray-500 hover:bg-gray-800 text-white px-6 py-1.5 shadow rounded-2xl border-none'>
          Cancel
        </Button>
      </Box>
    </div>
  )
}
