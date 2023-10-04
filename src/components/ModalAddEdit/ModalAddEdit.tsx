import { Box, Modal } from '@mui/material'
import { FC } from 'react'
import ModalAddEditForum from './ModalAddEditForum'
interface Props {
  open: boolean
  handleClose?: any
  handleAction?: any
  data?: any
  setData?: any
  page?: any
  duplicate?: any
  setDuplicate?: any
  noDuplicate?: any
  rowSelected?: any
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '0.5rem',
  border: '0.0625rem solid #d1d7e0',
  minWidth: 400,
  boxShadow: 24,
  p: 2.5,
}

const ModalAddEdit: FC<Props> = ({
  open,
  handleClose,
  handleAction,
  page,
  rowSelected,
}): JSX.Element => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Box>
            {page === 'FORUM' && (
              <ModalAddEditForum
                rowSelected={rowSelected}
                handleClose={handleClose}
                handleAction={handleAction}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalAddEdit
