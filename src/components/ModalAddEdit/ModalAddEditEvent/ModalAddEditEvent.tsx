import { IEvent } from '@interfaces/IEvent'
import { FC, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FooterModal from '../FooterModal'
import TextFieldV2 from '@components/TextFieldV2'
import DateTimePickerV2 from '@components/DateTimePickerV2'
import RichTextEditTor from '@components/RichTextEditor'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import MultiImage from '@components/MultiImage'
import { IDocuments } from '@interfaces/IPost'

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
  displayName: yup.string().required('Name is required!'),
  location: yup.string().required('Location of birth is required!'),
  startAt: yup
    .string()
    .required('Start Time is required!')
    .test({
      name: 'start-time-check',
      exclusive: true,
      message: 'Start Time must be less than End Time',
      test: function (value) {
        const { endAt } = this.parent
        return !endAt || new Date(value) < new Date(endAt)
      },
    })
    .test({
      name: 'start-time-future-check',
      message: 'Start Time must be in the future',
      test: function (value) {
        const currentTime = new Date()
        return new Date(value) > currentTime
      },
    }),
  endAt: yup
    .string()
    .required('End Time is required!')
    .test({
      name: 'end-time-check',
      exclusive: true,
      message: 'End Time must be greater than Start Time',
      test: function (value) {
        const { startAt } = this.parent
        return !startAt || new Date(value) > new Date(startAt)
      },
    }),
  content: yup.string().required('Description is required!'),
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
  const [imageEdit, setImageEdit] = useState<IDocuments[]>([])
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const defaultValues: IEvent = {
    id: rowSelected?.id || '',
    displayName: rowSelected?.displayName || '',
    location: rowSelected?.location || '',
    startAt: rowSelected?.startAt || '',
    endAt: rowSelected?.endAt || '',
    content: rowSelected?.content || '',
  }

  const { handleSubmit, control, setValue, watch, clearErrors } = useForm<IEvent>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: IEvent) => {
    handleAction({ ...data, FileImages: FileImages, imageEdit: imageEdit })
  }

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
    if (editorState.getCurrentContent().hasText()) {
      const dataHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      setValue('content', dataHTML)
    } else {
      setValue('content', '')
    }
  }

  const _deleteImage = (image: any) => {
    const newImage = Images.filter((file: any) => file.name !== image.name)
    setImages(newImage)
    const newFileImages = FileImages.filter(
      (file: any) => file.name.split('.')[0] !== image.name,
    )
    setFileImages(newFileImages)
    if (rowSelected) {
      const newImageEdit = imageEdit.filter((file: any) => file.fileName !== image.name)
      setImageEdit(newImageEdit)
    }
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

  const descriptionValue = watch('content')

  useEffect(() => {
    if (descriptionValue !== '') {
      clearErrors('content')
    }
  }, [editorState])

  useEffect(() => {
    if (rowSelected) {
      const contentBlock = htmlToDraft(rowSelected.content)
      const { contentBlocks, entityMap } = contentBlock
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const newEditorState = EditorState.createWithContent(contentState)
      setTimeout(() => {
        setEditorState(newEditorState)
      }, 50)
      if (rowSelected.documents !== undefined) {
        const image = rowSelected.documents.map((item) => {
          return { fileUrl: item.fileUrl, name: item.fileName }
        })
        setImageEdit(rowSelected.documents)
        if (image.length > 0) {
          setImages(image)
        }
      }
    }
  }, [rowSelected])

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
              name='displayName'
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
                name='startAt'
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
                name='endAt'
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
              name='content'
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
