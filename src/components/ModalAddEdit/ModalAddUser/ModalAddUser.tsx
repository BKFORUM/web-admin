import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FooterModal from '../FooterModal'
import TextFieldV2 from '@components/TextFieldV2'
import DateTimePicker from '@components/DateTimePicker'
import Selected from '@components/Selected'

interface Props {
  handleAction?: any
  handleClose?: any
}

interface IUser {
  id?: number
  name: string
  date_of_birth: string
  gender: string
  faculty: string
  role: string
  email: string
  phone_number: string
}

const schema = yup.object().shape({
  name: yup.string().required('Name is valid!'),
  date_of_birth: yup.string().required('Date of birth is valid!'),
  gender: yup.string().required('Gender is valid!'),
  faculty: yup.string().required('Faculty is valid!'),
  role: yup.string().required('Role is valid!'),
  email: yup.string().required('Email is valid!'),
  phone_number: yup.string().required('Phone number is valid!'),
})

const ModalAddUser: FC<Props> = ({ handleClose, handleAction }: Props): JSX.Element => {
  const defaultValues: IUser = {
    name: '',
    date_of_birth: '',
    gender: '',
    faculty: '',
    role: '',
    email: '',
    phone_number: '',
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: IUser) => {
    handleAction(data)
  }

  return (
    <div className='flex flex-col gap-2 w-[450px] relative'>
      <h2 className='m-auto text-xl font-semibold'>Add User</h2>
      <span
        className='absolute top-0 right-0 text-xl text-gray-500 cursor-pointer'
        onClick={() => handleClose()}>
        X
      </span>

      <div>
        <form
          action=''
          className={`flex flex-col gap-2 ${
            !!errors && Object.keys(errors).length > 2
              ? 'h-[500px] overflow-scroll '
              : 'h-auto'
          }`}
          onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-1'>
            <label
              htmlFor=''
              className='font-semibold text-gray-700'>
              Name <span className='text-red-600'>*</span>
            </label>
            <TextFieldV2
              name='name'
              control={control}
              // placeholder='name'
            />
          </div>

          <div className='grid grid-cols-2 justify-between gap-4 '>
            <div className='flex flex-col gap-1'>
              <label
                htmlFor=''
                className='font-semibold text-gray-700'>
                Date of birth <span className='text-red-600'>*</span>
              </label>
              <Controller
                name='date_of_birth'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DateTimePicker
                    error={error}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label
                htmlFor=''
                className='font-semibold text-gray-700'>
                Gender <span className='text-red-600'>*</span>
              </label>
              <Controller
                name='gender'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Selected
                    error={error}
                    onChange={onChange}
                    value={value}
                    empty='Select gender'
                  />
                )}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 justify-between gap-4 '>
            <div className='flex flex-col gap-1'>
              <label
                htmlFor=''
                className='font-semibold text-gray-700'>
                Faculty <span className='text-red-600'>*</span>
              </label>
              <Controller
                name='faculty'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Selected
                    error={error}
                    onChange={onChange}
                    value={value}
                    empty='Select faculty'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label
                htmlFor=''
                className='font-semibold text-gray-700'>
                Role <span className='text-red-600'>*</span>
              </label>
              <Controller
                name='role'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Selected
                    error={error}
                    onChange={onChange}
                    value={value}
                    empty='Select role'
                  />
                )}
              />
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <label
              htmlFor=''
              className='font-semibold text-gray-700'>
              Email <span className='text-red-600'>*</span>
            </label>
            <TextFieldV2
              name='email'
              control={control}
              // placeholder='name'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label
              htmlFor=''
              className='font-semibold text-gray-700'>
              Phone Number <span className='text-red-600'>*</span>
            </label>
            <TextFieldV2
              name='phone_number'
              control={control}
              // placeholder='name'
            />
          </div>

          <FooterModal
            handleSubmitAction={onSubmit}
            handleClose={handleClose}
          />
        </form>
      </div>
    </div>
  )
}

export default ModalAddUser
