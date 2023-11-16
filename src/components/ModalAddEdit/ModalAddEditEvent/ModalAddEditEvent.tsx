import { IEvent } from '@interfaces/IEvent'
import { FC, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FooterModal from '../FooterModal'
import TextFieldV2 from '@components/TextFieldV2'
import DateTimePickerV2 from '@components/DateTimePickerV2'
import RichTextEditTor from '@components/RichTextEditor'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import MultiImage from '@components/MultiImage'
// import { IDocuments } from '@interfaces/IPost'

interface Props<T> {
  handleAction: (data: any) => Promise<void>
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  rowSelected?: T
  loading: boolean
}

interface Image {
  name: string
  fileUrl: string
}

const schema = yup.object().shape({
  name: yup.string().required('Name is valid!'),
  location: yup.string().required('Location of birth is valid!'),
  startTime: yup
    .string()
    .required('Start Time is required!')
    .test({
      name: 'start-time-check',
      exclusive: true,
      message: 'Start Time must be less than End Time',
      test: function (value) {
        const { endTime } = this.parent
        return !endTime || new Date(value) < new Date(endTime)
      },
    }),
  endTime: yup
    .string()
    .required('End Time is required!')
    .test({
      name: 'end-time-check',
      exclusive: true,
      message: 'End Time must be greater than Start Time',
      test: function (value) {
        const { startTime } = this.parent
        return !startTime || new Date(value) > new Date(startTime)
      },
    }),
  description: yup.string().required('Description is valid!'),
})

const ModalAddEditEvent: FC<Props<IEvent>> = ({
  handleClose,
  rowSelected,
  handleAction,
  loading,
}: Props<IEvent>): JSX.Element => {
  const ImageRef: any = useRef()
  const [Images, setImages] = useState<Image[]>([])
  const [FileImages, setFileImages] = useState<File[]>([])
  // const [imageEdit, setImageEdit] = useState<IDocuments[]>([])
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const defaultValues: IEvent = {
    id: rowSelected?.id || '',
    name: rowSelected?.name || '',
    location: rowSelected?.location || '',
    startTime: rowSelected?.startTime || '',
    endTime: rowSelected?.endTime || '',
    description: rowSelected?.description || '',
  }

  const { handleSubmit, control, setValue, watch, clearErrors } = useForm<IEvent>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: IEvent) => {
    handleAction(data)
  }

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
    if (editorState.getCurrentContent().hasText()) {
      const dataHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      setValue('description', dataHTML)
    } else {
      setValue('description', '')
    }
  }

  const _deleteImage = (image: any) => {
    const newImage = Images.filter((file: any) => file.name !== image.name)
    setImages(newImage)
    const newFileImages = FileImages.filter(
      (file: any) => file.name.split('.')[0] !== image.name,
    )
    setFileImages(newFileImages)
    // if (rowSelected) {
    //   const newImageEdit = imageEdit.filter((file: any) => file.fileName !== image.name)
    //   setImageEdit(newImageEdit)
    // }
  }

  const handleFileChange = (file: any) => {
    const newFiles: any = Array.from(file)
    let newImages: any = [...Images]
    newImages = [...newFiles, ...Images]
    setFileImages(newImages)
    const newImagePreview: any = newImages.map((fileImage: any) => {
      if (fileImage.size) {
        return {
          name: fileImage.name.split('.')[0],
          fileUrl: URL.createObjectURL(fileImage),
        }
      }
      return fileImage
    })
    setImages(newImagePreview)
  }

  const descriptionValue = watch('description')

  useEffect(() => {
    if (descriptionValue !== '') {
      clearErrors('description')
    }
  }, [editorState])

  return (
    <div className='flex flex-col gap-2 min-w-[500px] relative'>
      <h2 className='m-auto text-xl font-semibold'>
        {rowSelected !== undefined ? 'Edit' : 'Add'} Event
      </h2>
      <span
        className='absolute top-0 right-0 text-xl text-gray-500 cursor-pointer'
        onClick={() => handleClose(false)}>
        X
      </span>

      <div>
        <form
          action=''
          className={`flex flex-col gap-2 max-h-[550px] overflow-auto`}
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
                Start time <span className='text-red-600'>*</span>
              </label>
              <Controller
                name='startTime'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DateTimePickerV2
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
                Start time <span className='text-red-600'>*</span>
              </label>
              <Controller
                name='endTime'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DateTimePickerV2
                    error={error}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <label
              htmlFor=''
              className='font-semibold text-gray-700'>
              Location <span className='text-red-600'>*</span>
            </label>
            <TextFieldV2
              name='location'
              control={control}
              disabled={rowSelected !== undefined ? true : false}
              // placeholder='name'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label
              htmlFor=''
              className='font-semibold text-gray-700'>
              Description <span className='text-red-600'>*</span>
            </label>

            <Controller
              name='description'
              control={control}
              render={({ field: {}, fieldState: { error } }) => (
                <RichTextEditTor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  error={error}
                />
              )}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label
              htmlFor=''
              className='font-semibold text-gray-700'>
              Image
            </label>
            <div className='grid gap-1'>
              <MultiImage
                single={false}
                listImage={Images}
                deleteImage={_deleteImage}
                handleFileChange={handleFileChange}
                InputRef={ImageRef}
              />
            </div>
          </div>

          <FooterModal
            loading={loading}
            isEdit={rowSelected !== undefined}
            handleSubmitAction={onSubmit}
            handleClose={handleClose}
          />
        </form>
      </div>
    </div>
  )
}

export default ModalAddEditEvent
