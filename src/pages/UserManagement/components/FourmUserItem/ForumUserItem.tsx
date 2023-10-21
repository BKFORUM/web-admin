import { FC } from 'react'
import { HiOutlineUser } from 'react-icons/hi'

interface Props {
  item: any
  key: number
}

const ForumUserItem: FC<Props> = ({ item }: Props): JSX.Element => {
  return (
    <div className='p-3 border border-gray-400 rounded-xl flex items-start flex-1 gap-4'>
      <div className='h-20 w-20 rounded-lg overflow-hidden'>
        <img
          className='h-full w-full object-cover'
          src={item.avatarURL}
          alt=''
        />
      </div>
      <div className='flex flex-col flex-1 gap-1 mb-auto'>
        <h4 className='text-xl font-semibold pt-0'>{item.name}</h4>
        <div className='flex flex-wrap gap-2'>
          {item.topics.map((topic: string) => (
            <span className='px-2 py-1 bg-[#E6F0F6] rounded-2xl text-sm'>{topic}</span>
          ))}
        </div>
        <div className='flex items-center gap-1'>
          <HiOutlineUser className='w-5 h-5' />
          <span className='font-thin text-sm'>
            {item.totalMember} <span>member</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ForumUserItem
