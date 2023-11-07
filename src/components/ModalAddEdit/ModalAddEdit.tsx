import { Box, Modal } from '@mui/material'
import { FC } from 'react'
import ModalAddEditForum from './ModalAddEditForum'
import ModalAddUserForum from './ModalAddUserForum'
import ModalAddUser from './ModalAddUser'
interface Props<T> {
  open: boolean
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  handleAction: (data: any) => Promise<void>
  loading: boolean
  page?: any
  rowSelected?: T
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

const ModalAddEdit: FC<Props<any>> = ({
  open,
  handleClose,
  handleAction,
  page,
  rowSelected,
  loading,
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
                loading={loading}
                rowSelected={rowSelected}
                handleClose={handleClose}
                handleAction={handleAction}
              />
            )}
            {page === 'VIEW_FORUM' && (
              <ModalAddUserForum
                loading={loading}
                handleClose={handleClose}
                handleAction={handleAction}
              />
            )}

            {page === 'USER' && (
              <ModalAddUser
                loading={loading}
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
