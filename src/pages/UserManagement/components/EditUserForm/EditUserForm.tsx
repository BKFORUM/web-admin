import { FC } from 'react'
import { motion } from 'framer-motion'
import test from '../../../../assets/images/test.jpg'

interface Props {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const EditUserForm: FC<Props> = ({ setIsEdit }: Props): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='rounded-xl flex flex-col '>
      <div>
        <div className='h-40 w-40 rounded-[50%] overflow-hidden mt-6'>
          <img
            className='h-full w-full object-cover'
            src={test}
            alt=''
          />
        </div>
      </div>

      <button onClick={() => setIsEdit(false)}>Cancel</button>
    </motion.div>
  )
}

export default EditUserForm
