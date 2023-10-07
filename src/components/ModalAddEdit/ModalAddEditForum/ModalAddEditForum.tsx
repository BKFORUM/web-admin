import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextFieldV2 from '@components/TextFieldV2'
import FooterModal from '../FooterModal'
import AutocompleteCustom from '@components/Autocomplete/Autocomplete'
import InputFile from '@components/InputFile'

interface Props {
  handleAction?: any
  handleClose?: any
  rowSelected?: any
}

interface IFormDataForum {
  name: string
  moderator: string
}

const schema = yup.object().shape({
  name: yup.string().required('Name không được để trống !!!'),
  moderator: yup.string().required('Moderator không được để trống !!!'),
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
  }
  const { handleSubmit, control } = useForm<IFormDataForum>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: IFormDataForum) => {
    handleAction(data)
  }

  return (
    <div>
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
          <AutocompleteCustom
            name='moderator'
            control={control}
            placeholder='Select Moderator'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor=''
            className='font-semibold text-gray-700'>
            Type<span className='text-red-600'> *</span>
          </label>
          <AutocompleteCustom
            name='moderator'
            control={control}
            placeholder='Select Moderator'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor=''
            className='font-semibold text-gray-700'>
            Categories<span className='text-red-600'> *</span>
          </label>
          <AutocompleteCustom
            name='moderator'
            control={control}
            placeholder='Select Moderator'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor=''
            className='font-semibold text-gray-700'>
            User
          </label>
          <InputFile />
        </div>
        <FooterModal
          handleSubmitAction={onSubmit}
          handleClose={handleClose}
        />
      </form>
    </div>
  )
}

export default ModalAddEditForum
