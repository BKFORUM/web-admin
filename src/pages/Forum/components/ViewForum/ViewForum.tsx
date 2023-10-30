import { FC, useEffect, useState } from 'react'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import Button from '@components/Button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineUserAdd } from 'react-icons/ai'
import ModalAddEdit from '@components/ModalAddEdit'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  forumActionSelector,
  forumStateSelector,
  notifyActionSelector,
} from '@store/index'
import { IUserForum } from '@interfaces/IUser'
import { IForumDetail } from '@interfaces/IForum'
import ForumUserDetail from '../ForumUserDetail'
import { IPostForum } from '@interfaces/IPost'
import ForumPostDetail from '../ForumPostDetail'

interface Props {}

const ViewForum: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { addUserToForum, setIsAddUserToForumSuccess, getForumById } =
    useStoreActions(forumActionSelector)
  const { messageErrorForum, isAddUserToForumSuccess } = useStoreState(forumStateSelector)
  const [data, setData] = useState<IForumDetail | null>(null)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const [rowsUserData, setRowsUserData] = useState<IUserForum[]>([])
  const [rowsPostData, setRowsPostData] = useState<IPostForum[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('members')
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)

  const getAllUserPage = async (): Promise<void> => {
    setLoading(true)
    if (id !== undefined) {
      const res = await getForumById(id)
      setData(res)
      setLoading(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (data === null) {
      getAllUserPage()
    } else {
      const userRowsDataTMP = data.users?.map((item: { user: IUserForum }) => item.user)
      setRowsUserData(userRowsDataTMP)
      setRowsPostData(data.posts)
    }
  }, [data])

  useEffect(() => {
    if (!isAddUserToForumSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsAddUserToForumSuccess(true)
    }
  }, [isAddUserToForumSuccess])

  const handleAddUserToForum = async (data: any): Promise<void> => {
    if (id !== undefined) {
      const res = await addUserToForum({ id: id, userIds: data })
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Add user to forum successful !',
        })
        getAllUserPage()
      }
    }
  }

  return (
    <>
      <div className='flex flex-col px-1 h-full'>
        <h2 className='font-semibold text-xl'>
          <ArrowBackIosOutlinedIcon
            onClick={() => navigate('/')}
            sx={{ fontSize: 20, marginBottom: 0.2, marginRight: 2, cursor: 'pointer' }}
          />
          Forum: <span className='ml-4  text-[#3E9FDA]'>{data?.name}</span>
        </h2>
        <div className='my-8 grid xs:grid-cols-2 md:grid-cols-4 gap-4'>
          <div
            onClick={() => setTab('members')}
            className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
              tab === 'members' && 'border-none bg-[#3E9FDA]'
            }`}>
            <span
              className={`text-lg text-[#3E9FDA] font-bold ${
                tab === 'members' && 'text-white'
              }`}>
              {data?.users.length}
            </span>
            <span className={`${tab === 'members' && 'text-white'}`}>Members</span>
          </div>
          <div
            onClick={() => setTab('posts')}
            className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
              tab === 'posts' && 'border-none bg-[#3E9FDA]'
            }`}>
            <span
              className={`text-lg text-[#3E9FDA] font-bold ${
                tab === 'posts' && 'text-white'
              }`}>
              {data?.posts.length}
            </span>
            <span className={`${tab === 'posts' && 'text-white'}`}>Post</span>
          </div>
          <div
            onClick={() => setTab('events')}
            className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
              tab === 'events' && 'border-none bg-[#3E9FDA]'
            }`}>
            <span
              className={`text-lg text-[#3E9FDA] font-bold ${
                tab === 'events' && 'text-white'
              }`}>
              24
            </span>
            <span className={`${tab === 'events' && 'text-white'}`}>Events</span>
          </div>
          <div
            onClick={() => setTab('moderator')}
            className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
              tab === 'moderator' && 'border-none bg-[#3E9FDA]'
            }`}>
            <span
              className={`text-lg text-[#3E9FDA] font-bold ${
                tab === 'moderator' && 'text-white'
              }`}>
              1
            </span>
            <span className={`${tab === 'moderator' && 'text-white'}`}>Moderator</span>
          </div>
        </div>

        <div className=' w-full overflow-x-hidden'>
          {tab === 'members' && (
            <ForumUserDetail
              rowsData={rowsUserData}
              loading={loading}
            />
          )}
          {tab === 'posts' && (
            <ForumPostDetail
              rowsData={rowsPostData}
              loading={loading}
            />
          )}
          {tab === 'events' && <span>Events</span>}
          {tab === 'moderator' && <span>Moderator</span>}
        </div>
      </div>
      <div className='mt-auto  flex'>
        {tab === 'members' && (
          <Button
            typeButton='blue'
            onClick={() => setOpenModalEdit(true)}
            className='ml-auto rounded-xl'>
            <AiOutlineUserAdd style={{ fontSize: '24px' }} />
            <span className='ml-2'>Add members</span>
          </Button>
        )}
      </div>
      <ModalAddEdit
        open={openModalEdit}
        handleClose={setOpenModalEdit}
        handleAction={handleAddUserToForum}
        page='VIEW_FORUM'
      />
    </>
  )
}

export default ViewForum
