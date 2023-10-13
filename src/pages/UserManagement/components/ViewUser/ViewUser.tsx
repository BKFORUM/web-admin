import { FC, useState } from 'react'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import { useNavigate } from 'react-router-dom'
import test from '../../../../assets/images/test.jpg'
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
} from 'react-icons/hi'
import { GrUserSettings } from 'react-icons/gr'
import EditUserForm from '../EditUserForm'

interface Props {}

const ViewUser: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  return (
    <div className='relative grid grid-cols-12 gap-2 h-full flex-1 '>
      {!isEdit && (
        <ArrowBackIosOutlinedIcon
          onClick={() => navigate('/user-management')}
          sx={{ position: 'absolute', top: '8px', left: '4px', cursor: 'pointer' }}
        />
      )}

      <div className='col-span-3 border border-gray-300 rounded-xl'>
        {!isEdit && (
          <div className='flex flex-col  items-center h-full'>
            <div className='h-40 w-40 rounded-[50%] overflow-hidden mt-6'>
              <img
                className='h-full w-full object-cover'
                src={test}
                alt=''
              />
            </div>
            <h4 className='font-semibold'>Trương Quang Khang</h4>
            <span className='text-xs font-thin'>22/07/2002</span>

            <div className='flex flex-col px-4 mt-4 gap-4'>
              <div className='flex items-center'>
                <HiOutlineLocationMarker className='w-12 h-12 ' />
                <span className='text-sm ml-[14px]'>
                  54 Nguyễn Lương Bằng, Liên Chiểu Đà Nẵng
                </span>
              </div>
              <div className='flex items-center'>
                <HiOutlineMail className='w-8 h-8 ' />
                <span className='text-sm ml-4'>102200175@sv1.dut.udn.vn</span>
              </div>
              <div className='flex items-center'>
                <GrUserSettings className='w-7 h-7 ml-1 ' />
                <span className='text-sm ml-4'>Student</span>
              </div>
              <div className='flex items-center'>
                <HiOutlineOfficeBuilding className='w-8 h-8 ' />
                <span className='text-sm ml-4'>Information Technology</span>
              </div>
            </div>
            <div className='mt-2'>
              <button
                onClick={() => setIsEdit(true)}
                className='px-6 py-1 bg-[#E6F0F6] text-black font-thin rounded-2xl hover:bg-cyan-400/20 transition-all duration-200'>
                Edit profile
              </button>
            </div>
          </div>
        )}

        {isEdit && <EditUserForm setIsEdit={setIsEdit} />}
      </div>

      <div className='col-span-9 bg-slate-200'>lalal</div>
    </div>
  )
}

export default ViewUser
