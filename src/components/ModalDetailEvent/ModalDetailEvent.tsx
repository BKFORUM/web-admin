import Comment from '@components/ModalDetailPost/components/Comment'
import PostContent from '@components/PostContent'
import { Dialog, Transition } from '@headlessui/react'
import { IEvent } from '@interfaces/IEvent'
import { IComment, pageMode } from '@interfaces/IPost'
import { eventActionSelector } from '@store/index'
import { formatDateLocalV2 } from '@utils/functions/formatDay'
import { useStoreActions } from 'easy-peasy'
import { FC, Fragment, useEffect, useState } from 'react'
import { HiOutlineStar } from 'react-icons/hi'
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2'

interface Props {
  item?: IEvent
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalDetailEvent: FC<Props> = ({ item, open, setOpen }: Props): JSX.Element => {
  const { getAllCommentEventById } = useStoreActions(eventActionSelector)
  const [loading, setIsLoading] = useState<boolean>(false)
  // const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [totalRowCount, setTotalRowCount] = useState<number>(0)
  const [paginationModel, setPaginationModel] = useState<pageMode | null>(null)
  const [data, setData] = useState<IComment[]>([])

  const getAllCommentPage = async (): Promise<void> => {
    if (paginationModel && item) {
      setIsLoading(true)
      const res = await getAllCommentEventById({
        id: item.id,
        params: {
          skip: paginationModel.page * 10,
          take: paginationModel.pageSize,
        },
      })
      if (res) {
        setTotalRowCount(res.totalRecords)
        setData([...data, ...res.data])

        // const countsReply = res.data.map((item: IComment) => {
        //   return { id: item.id, _count: item._count?.replyComments }
        // })
        // setCountReplyByCommentId([...countReplyByCommentId, ...countsReply])
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllCommentPage()
  }, [paginationModel])

  useEffect(() => {
    if (item) {
      setData([])
      setPaginationModel({ page: 0, pageSize: 10 })
    }
  }, [item])

  return (
    <div>
      <Transition
        appear
        show={open}
        as={Fragment}>
        <Dialog
          as='div'
          className='relative z-[999]'
          onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex h-screen items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='relative w-full max-w-[660px] flex flex-col   rounded-xl bg-white text-left align-middle shadow-xl '>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900 text-center shadow py-3 '>
                    Nội dung sự kiện
                  </Dialog.Title>
                  <div
                    id='scrollableDiv'
                    className='mt-2 max-h-[500px] overflow-y-auto px-3'>
                    <div className='flex flex-col gap-1'>
                      <span className='text-xs font-semibold text-red-600'>
                        Từ {formatDateLocalV2(item?.startAt || '')} đến{' '}
                        {formatDateLocalV2(item?.endAt || '')}
                      </span>
                      <h4 className='text-lg font-medium'>{item?.displayName}</h4>
                      <p className='text-sm font-thin '>{item?.location}</p>
                    </div>
                    <span className='absolute right-4 top-16 border border-gray-400 text-gray-700 px-4 py-2 text-xs rounded-3xl'>
                      {item?.status}
                    </span>
                    <div className='mt-2'>
                      <PostContent
                        content={item?.content}
                        images={item?.documents}
                        type='events'
                      />
                    </div>

                    <>
                      <div className='bg-gray-300 px-2 rounded-md mt-3 flex gap-8'>
                        <button className='outline-none flex gap-1.5 py-1 items-center border-none hover:opacity-75'>
                          <HiOutlineStar className='text-blue-700 h-4 w-4' />
                          <span className='text-blue-700 '>Tham gia</span>
                        </button>

                        <button className='outline-none flex gap-1.5 py-1 items-center border-none'>
                          <HiOutlineChatBubbleLeftEllipsis className='text-blue-700 h-4 w-4' />
                          <span className='text-blue-700'>Bình luận</span>
                        </button>
                      </div>
                      <div className='pb-4'>
                        <Comment
                          data={data}
                          loading={loading}
                          paginationModel={paginationModel}
                          setPaginationModel={setPaginationModel}
                          totalRowCount={totalRowCount}
                        />
                      </div>
                    </>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ModalDetailEvent
