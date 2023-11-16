import { IComment, pageMode } from '@interfaces/IPost'
import { Tooltip } from '@mui/material'
import { dayComparedToThePast } from '@utils/functions/formatDay'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div>
      <div className='flex flex-col gap-1.5 px-3 py-2'>
        {data.map((item, index) => (
          <div
            key={index}
            className='flex gap-2'>
            <Tooltip
              title={item.user.fullName}
              className='mt-auto '>
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
              </div>
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && !loading && (
        <p className='text-center font-medium'>Bài viết chưa có bình luận nào</p>
      )}
      {data.length > 0 && data.length === totalRowCount && !loading && (
        <p className='text-center font-medium'>Đã hiện thị tất cả các bình luận</p>
      )}
      {loading && <div>Loading...</div>}
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
