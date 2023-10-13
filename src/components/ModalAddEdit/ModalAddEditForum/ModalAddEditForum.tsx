import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextFieldV2 from '@components/TextFieldV2'
import FooterModal from '../FooterModal'
import AutocompleteCustom from '@components/Autocomplete/Autocomplete'
// import InputFile from '@components/InputFile'

interface Props {
  handleAction?: any
  handleClose?: any
  rowSelected?: any
}

interface IFormDataForum {
  name: string
  moderator: string
  type: string
}

const schema = yup.object().shape({
  name: yup.string().required('Name không được để trống !!!'),
  moderator: yup.string().required('Moderator không được để trống !!!'),
  type: yup.string().required('Type không được để trống !!!'),
})

const ModalAddEditForum: FC<Props> = ({
  handleAction,
  handleClose,
  rowSelected,
}: Props): JSX.Element => {
  console.log(rowSelected)
  const defaultValues: IFormDataForum = {
    name: '',
    moderator: '',
    type: '',
  }
  const { handleSubmit, control } = useForm<IFormDataForum>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: IFormDataForum) => {
    handleAction(data)
  }

  return (
    <div className='flex flex-col gap-2 relative'>
      <h2 className='m-auto text-xl font-semibold'>Add Members</h2>
      <span
        className='absolute top-0 right-0 text-xl text-gray-500 cursor-pointer'
        onClick={() => handleClose()}>
        X
      </span>
      <form
        action=''
        className='flex flex-col gap-2'
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
            placeholder='name'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label
            htmlFor=''
            className='font-semibold text-gray-700'>
            Moderator<span className='text-red-600'> *</span>
          </label>
          <Controller
            name='moderator'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <AutocompleteCustom
                onChange={onChange}
                value={value}
                error={error}
                placeholder='Select moderator'
              />
            )}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor=''
            className='font-semibold text-gray-700'>
            Type<span className='text-red-600'> *</span>
          </label>
          <Controller
            name='type'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <AutocompleteCustom
                onChange={onChange}
                value={value}
                error={error}
                placeholder='Select type'
              />
            )}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor=''
            className='font-semibold text-gray-700'>
            Categories<span className='text-red-600'> *</span>
          </label>
          <Controller
            name='moderator'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <AutocompleteCustom
                onChange={onChange}
                value={value}
                error={error}
                placeholder='Select Moderator'
              />
            )}
          />
        </div>
        {/* <div className='flex flex-col gap-1'>
        <label
          htmlFor=''
          className='font-semibold text-gray-700'>
          User
        </label>
        <InputFile />
      </div> */}
        <FooterModal
          handleSubmitAction={onSubmit}
          handleClose={handleClose}
        />
      </form>
    </div>
  )
}

export default ModalAddEditForum
