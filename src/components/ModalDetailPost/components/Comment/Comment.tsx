import { IChildLoading, IComment, IDataChild, pageMode } from '@interfaces/IPost'
import { Tooltip } from '@mui/material'
import { postActionSelector, postStateSelector } from '@store/index'
import { dayComparedToThePast } from '@utils/functions/formatDay'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowTurnUp } from 'react-icons/fa6'
import FirstChildComment from '../FirstChildComment'

interface Props {
  data: IComment[]
  loading: boolean
  setPaginationModel: React.Dispatch<React.SetStateAction<pageMode | null>>
  totalRowCount: number
  paginationModel: pageMode | null
}

const Comment: FC<Props> = ({
  data,
  setPaginationModel,
  totalRowCount,
  loading,
}: Props): JSX.Element => {
  const navigate = useNavigate()
  const { getAllReplyByCommentId } = useStoreActions(postActionSelector)
  const { countReplyByCommentId } = useStoreState(postStateSelector)

  const [reply, setReply] = useState<number[] | null>(null)
  const [showAllChild, setShowAllChild] = useState<number[] | null>(null)

  const [dataChild, setDataChild] = useState<IDataChild[]>([])
  const [isLoading, setIsLoading] = useState<IChildLoading | null>(null)

  const getAllCommentPage = async (id: string): Promise<void> => {
    if ((countReplyByCommentId.find((reply) => reply.id === id)?._count || 0) > 0) {
      setIsLoading({ id: id, isLoading: true })
      const res = await getAllReplyByCommentId({
        id: id,
        params: {
          take: 1000000,
        },
      })
      if (res) {
        const newData = { id: id, data: res }
        setDataChild([...dataChild, newData])
      }
      setIsLoading({ id: id, isLoading: false })
    } else {
      setDataChild([...dataChild, { id: id, data: [] }])
    }
  }
  return (
    <div>
      <div className='flex flex-col gap-1.5 px-3 py-2'>
        {data.map((item, index) => (
          <div
            key={index}
            className='flex gap-2'>
            <Tooltip
              title={item.user.fullName}
              className='mt-2 mb-auto'>
              <div
                className='h-8 w-8 overflow-hidden cursor-pointer'
                onClick={() => navigate('/profile/' + item.user.id)}>
                <img
                  className='h-full w-full border border-gray-200 rounded-full'
                  src={item.user.avatarUrl}
                  alt={item.user.fullName}
                />
              </div>
            </Tooltip>
            <div className='flex flex-col gap-0 group'>
              <div className='flex items-center'>
                <span className='text-[13px] font-medium'>{item.user.fullName}</span>
                <span className='text-xs ml-2.5 '>
                  {dayComparedToThePast(item.createdAt)}
                </span>
              </div>
              <div className=''>
                <span className='flex gap-4 items-center '>
                  <span className='text-sm px-2 py-0.5 bg-gray-200 rounded-lg'>
                    {item.content}
                  </span>
                </span>

                <div>
                  {!showAllChild?.some((number) => number === index) &&
                    (countReplyByCommentId.find((data) => data.id === item.id)?._count ||
                      0) > 0 && (
                      <span
                        onClick={() => {
                          setReply([...(reply || []), index])
                          setShowAllChild([...(showAllChild || []), index])
                          getAllCommentPage(item.id)
                        }}
                        className='text-sm text-gray-600 font-semibold cursor-pointer'>
                        <FaArrowTurnUp className='rotate-90 inline mr-0.5' /> Xem tất cả{' '}
                        {countReplyByCommentId.find((data) => data.id === item.id)
                          ?._count || ''}{' '}
                        phản hồi
                      </span>
                    )}
                  {showAllChild?.some((number) => number === index) && (
                    <div className=''>
                      {isLoading?.id === item?.id && isLoading?.isLoading ? (
                        <>
                          <div className='animate-pulse flex items-center rounded-xl py-1.5'>
                            <div className='flex gap-2 items-center '>
                              <div className='h-7 w-7 rounded-full bg-slate-200 ml-3 '></div>
                              <div className='flex flex-col gap-1'>
                                <div className='flex gap-2'>
                                  <div className='h-2.5 w-[100px] bg-slate-200 rounded  '></div>
                                  <div className='h-2.5 w-[50px] bg-slate-200 rounded  '></div>
                                </div>
                                <div className='h-4 w-[200px] bg-slate-200 rounded-md  '></div>
                              </div>
                            </div>
                          </div>

                          <div className='animate-pulse flex items-center rounded-xl py-1.5'>
                            <div className='flex gap-2 items-center '>
                              <div className='h-7 w-7 rounded-full bg-slate-200 ml-3 '></div>
                              <div className='flex flex-col gap-1'>
                                <div className='flex gap-2'>
                                  <div className='h-2.5 w-[100px] bg-slate-200 rounded  '></div>
                                  <div className='h-2.5 w-[50px] bg-slate-200 rounded  '></div>
                                </div>
                                <div className='h-4 w-[200px] bg-slate-200 rounded-md  '></div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <FirstChildComment
                          idParent={item.id}
                          setDataChild={setDataChild}
                          data={
                            dataChild.find((child) => child.id === item.id)?.data || []
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && !loading && (
        <p className='text-center font-medium'>Chưa có bình luận nào</p>
      )}
      {data.length > 0 && data.length === totalRowCount && !loading && (
        <p className='text-center font-medium'>Đã hiện thị tất cả các bình luận</p>
      )}
      {loading && (
        <>
          <div className='animate-pulse flex items-center rounded-xl py-1.5'>
            <div className='flex gap-2 items-center '>
              <div className='h-10 w-10 rounded-full bg-slate-200 ml-3 '></div>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <div className='h-2.5 w-[100px] bg-slate-200 rounded  '></div>
                  <div className='h-2.5 w-[50px] bg-slate-200 rounded  '></div>
                </div>
                <div className='h-4 w-[200px] bg-slate-200 rounded-md  '></div>
              </div>
            </div>
          </div>

          <div className='animate-pulse flex items-center rounded-xl py-1.5'>
            <div className='flex gap-2 items-center '>
              <div className='h-10 w-10 rounded-full bg-slate-200 ml-3 '></div>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <div className='h-2.5 w-[100px] bg-slate-200 rounded  '></div>
                  <div className='h-2.5 w-[50px] bg-slate-200 rounded  '></div>
                </div>
                <div className='h-4 w-[200px] bg-slate-200 rounded-md  '></div>
              </div>
            </div>
          </div>

          <div className='animate-pulse flex items-center rounded-xl py-1.5'>
            <div className='flex gap-2 items-center '>
              <div className='h-10 w-10 rounded-full bg-slate-200 ml-3 '></div>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <div className='h-2.5 w-[100px] bg-slate-200 rounded  '></div>
                  <div className='h-2.5 w-[50px] bg-slate-200 rounded  '></div>
                </div>
                <div className='h-4 w-[200px] bg-slate-200 rounded-md  '></div>
              </div>
            </div>
          </div>
        </>
      )}
      {data.length !== 0 && data.length < totalRowCount && !loading && (
        <span
          onClick={() =>
            setPaginationModel((prevPaginationModel) => ({
              page: prevPaginationModel ? prevPaginationModel.page + 1 : 0,
              pageSize: 10,
            }))
          }
          className='text-gray-500 text-base font-medium  cursor-pointer pb-2 px-4'>
          Xem thêm bình luận
        </span>
      )}
    </div>
  )
}

export default Comment
