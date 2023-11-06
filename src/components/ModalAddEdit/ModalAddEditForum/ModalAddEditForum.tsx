import { FC, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextFieldV2 from '@components/TextFieldV2'
import FooterModal from '../FooterModal'
import AutocompleteCustom from '@components/Autocomplete/Autocomplete'
import MultiSelect from '@components/MultiSelect'
import Selected from '@components/Selected'
import { Type } from '@commom/enum'
import { IOption, ITopic } from '@interfaces/ITopics'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  forumActionSelector,
  forumStateSelector,
  notifyActionSelector,
  userActionSelector,
  userStateSelector,
} from '@store/index'
import { IFormDataForum } from '@interfaces/IForum'
interface Props<T> {
  handleAction: (data: any) => Promise<void>
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  rowSelected?: T
  loading: boolean
}

const optionTypes: IOption[] = [
  {
    id: Type.HOMEROOM,
    name: Type.HOMEROOM,
  },
  {
    id: Type.TOPIC,
    name: Type.TOPIC,
  },
]

const schema = yup.object().shape({
  name: yup.string().required('Name không được để trống !!!'),
  moderatorId: yup.string().required('Moderator không được để trống !!!'),
  type: yup.string().required('Type không được để trống !!!'),
  topicIds: yup.array().when('type', {
    is: (val: string) => val === 'TOPIC',
    then: () =>
      yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one option')
        .required('Please select at least one option'),
    otherwise: () => yup.array().transform((current) => current || []),
  }),
})

const ModalAddEditForum: FC<Props<IFormDataForum>> = ({
  handleAction,
  handleClose,
  rowSelected,
  loading,
}: Props<IFormDataForum>): JSX.Element => {
  const { isGetAllUserSuccess, messageErrorUser } = useStoreState(userStateSelector)
  const { getAllUser, setIsGetAllUserSuccess } = useStoreActions(userActionSelector)
  const { getAllTopic, setIsGetAllTopicSuccess } = useStoreActions(forumActionSelector)
  const { messageErrorForum, isGetAllTopicSuccess } = useStoreState(forumStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const defaultValues: IFormDataForum = {
    id: rowSelected?.id || '',
    name: rowSelected?.name || '',
    moderatorId: rowSelected?.moderatorId || '',
    type: rowSelected?.type || '',
    topicIds: rowSelected?.topicIds || [],
  }
  const { handleSubmit, control, watch, setValue } = useForm<IFormDataForum>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema) as any,
  })

  const [optionsTopic, setOptionsTopic] = useState<IOption[]>([])
  const [optionsModerator, setOptionsModerator] = useState<IOption[]>([])

  const getAllTopicForum = async (): Promise<void> => {
    const res = await getAllTopic()
    if (res) {
      const data = res.map((item: ITopic) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
      setOptionsTopic(data)
    }
  }

  const getAllUserPage = async (): Promise<void> => {
    const res = await getAllUser({
      take: 10000000000,
    })
    if (res) {
      const data = res?.data?.map((item: any) => ({
        id: item.id,
        name: item.fullName,
      }))
      setOptionsModerator(data)
    }
  }

  const onSubmit = async (data: IFormDataForum) => {
    handleAction(data)
  }

  const selectedType = watch('type')

  useEffect(() => {
    getAllUserPage()
    getAllTopicForum()
  }, [])

  useEffect(() => {
    if (!isGetAllUserSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorUser })
      setIsGetAllUserSuccess(true)
    }
  }, [isGetAllUserSuccess])

  useEffect(() => {
    if (!isGetAllTopicSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsGetAllTopicSuccess(true)
    }
  }, [isGetAllTopicSuccess])

  useEffect(() => {
    if (selectedType === 'HOMEROOM') setValue('topicIds', [])
  }, [selectedType])

  return (
    <div className='flex flex-col gap-2 relative'>
      <h2 className='m-auto text-xl font-semibold'>
        {rowSelected !== undefined ? 'Edit' : 'Add'} forum
      </h2>
      <span
        className='absolute top-0 right-0 text-xl text-gray-500 cursor-pointer'
        onClick={() => handleClose(false)}>
        X
      </span>
      <form
        action=''
        className='flex flex-col gap-2 max-h-[450px] overflow-y-auto'
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
            Type<span className='text-red-600'> *</span>
          </label>
          <Controller
            name='type'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Selected
                onChange={onChange}
                value={value}
                error={error}
                options={optionTypes}
                empty='Select Type'
              />
            )}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label
            htmlFor=''
            className='font-semibold text-gray-700'>
            Moderator<span className='text-red-600'> *</span>
          </label>
          <Controller
            name='moderatorId'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <AutocompleteCustom
                onChange={onChange}
                value={value}
                error={error}
                options={optionsModerator}
                placeholder='Select moderator'
                disabled={rowSelected !== undefined}
              />
            )}
          />
        </div>

        {selectedType === 'TOPIC' && (
          <div className='flex flex-col gap-1'>
            <label
              htmlFor=''
              className='font-semibold text-gray-700'>
              Categories<span className='text-red-600'> *</span>
            </label>
            <Controller
              name='topicIds'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <MultiSelect
                  onChange={onChange}
                  value={value}
                  options={optionsTopic}
                  error={error}
                />
              )}
            />
          </div>
        )}

        <FooterModal
          loading={loading}
          isEdit={rowSelected !== undefined}
          handleSubmitAction={onSubmit}
          handleClose={handleClose}
        />
      </form>
    </div>
  )
}

export default ModalAddEditForum
