import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FooterModal from '../FooterModal'
import TextFieldV2 from '@components/TextFieldV2'
import DateTimePicker from '@components/DateTimePicker'
import Selected from '@components/Selected'
import { IOption } from '@interfaces/ITopics'
import { Gender, ROLE } from '@commom/enum'
import AutocompleteCustom from '@components/Autocomplete/Autocomplete'
import { useStoreActions } from 'easy-peasy'
import { facultyActionSelector } from '@store/index'
import { IUser } from '@interfaces/IUser'

interface Props<T> {
  handleAction: (data: any) => Promise<void>
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  rowSelected?: T
}

const optionsGender: IOption[] = [
  {
    id: Gender.MALE,
    name: Gender.MALE,
  },
  {
    id: Gender.FEMALE,
    name: Gender.FEMALE,
  },
]

const optionsRole: IOption[] = [
  {
    id: ROLE.STUDENT,
    name: ROLE.STUDENT,
  },
  {
    id: ROLE.TEACHER,
    name: ROLE.TEACHER,
  },
]

const schema = yup.object().shape({
  fullName: yup.string().required('Name is valid!'),
  dateOfBirth: yup.string().required('Date of birth is valid!'),
  gender: yup.string().required('Gender is valid!'),
  facultyId: yup.string().required('Faculty is valid!'),
  type: yup.string().required('Role is valid!'),
  email: yup
    .string()
    .matches(
      /[0-9]{9}@sv1.dut.udn.vn/,
      'Invalid email format. Please use the format: 123456789@sv1.dut.udn.vn',
    )
    .required('Email is required'),
  phoneNumber: yup.string().required('Phone number is valid!'),
})

const ModalAddUser: FC<Props<IUser>> = ({
  handleClose,
  handleAction,
}: Props<IUser>): JSX.Element => {
  const { getAllFaculty } = useStoreActions(facultyActionSelector)
  const [optionsFaculty, setOptionFaculty] = useState<IOption[]>([])

  const getAllFacultyAddUser = async (): Promise<void> => {
    const res = await getAllFaculty()
    if (res) {
      setOptionFaculty(res)
    }
  }

  useEffect(() => {
    getAllFacultyAddUser()
  }, [])

  const defaultValues: IUser = {
    fullName: '',
    dateOfBirth: '',
    gender: '',
    facultyId: '',
    type: '',
    email: '',
    phoneNumber: '',
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
        onClick={() => handleClose(false)}>
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
              name='fullName'
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
                name='dateOfBirth'
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
                    options={optionsGender}
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
                name='facultyId'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <AutocompleteCustom
                    onChange={onChange}
                    value={value}
                    error={error}
                    options={optionsFaculty}
                    placeholder='Select moderator'
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
                name='type'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Selected
                    error={error}
                    onChange={onChange}
                    value={value}
                    options={optionsRole}
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
              name='phoneNumber'
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
