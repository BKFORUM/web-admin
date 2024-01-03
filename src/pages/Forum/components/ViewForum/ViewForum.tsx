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
import ForumUserDetail from '../ForumUserDetail'
import ForumPostDetail from '../ForumPostDetail'
import noData from '../../../../assets/images/notFoundSearch.jpg'
import ForumEventDetail from '../ForumEventDetail'

interface Props {}

const ViewForum: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { addUserToForum, setIsAddUserToForumSuccess, getForumById, setForumDetail } =
    useStoreActions(forumActionSelector)
  const { messageErrorForum, isAddUserToForumSuccess, forumDetail } =
    useStoreState(forumStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const [statusPageDetail, setStatusPageDetail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('members')
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)

  const getDetailForum = async (): Promise<void> => {
    setStatusPageDetail('LOADING')
    if (id !== undefined) {
      const res = await getForumById(id)
      if (res) setStatusPageDetail('SUCCESS')
      else setStatusPageDetail('NODATA')
    }
  }

  useEffect(() => {
    setForumDetail(null)
  }, [id])

  useEffect(() => {
    if (forumDetail === null) {
      getDetailForum()
    }
  }, [forumDetail])

  useEffect(() => {
    if (!isAddUserToForumSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageErrorForum })
      setIsAddUserToForumSuccess(true)
    }
  }, [isAddUserToForumSuccess])

  const handleAddUserToForum = async (data: any): Promise<void> => {
    setLoading(true)
    if (id !== undefined) {
      const res = await addUserToForum({ id: id, userIds: data })
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Add user to forum successful !',
        })
        getDetailForum()
      }
    }
    setLoading(false)
  }

  return (
    <>
      {statusPageDetail === 'SUCCESS' && (
        <>
          <div className='flex flex-col px-1 h-full'>
            <h2 className='font-semibold text-xl'>
              <ArrowBackIosOutlinedIcon
                onClick={() => navigate('/')}
                sx={{
                  fontSize: 20,
                  marginBottom: 0.2,
                  marginRight: 2,
                  cursor: 'pointer',
                }}
              />
              Forum: <span className='ml-4  text-[#3E9FDA]'>{forumDetail?.name}</span>
            </h2>
            <div className='my-8 grid xs:grid-cols-2 md:grid-cols-3 gap-4'>
              <div
                onClick={() => setTab('members')}
                className={`mx-auto flex flex-col justify-center w-[100px] shrink-1 items-center border border-[#3E9FDA] px-4 p-1 rounded-2xl cursor-pointer ${
                  tab === 'members' && 'border-none bg-[#3E9FDA]'
                }`}>
                <span
                  className={`text-lg text-[#3E9FDA] font-bold ${
                    tab === 'members' && 'text-white'
                  }`}>
                  {forumDetail?.users.length}
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
                  {forumDetail?.posts.length}
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
                  {forumDetail?.events.length}
                </span>
                <span className={`${tab === 'events' && 'text-white'}`}>Events</span>
              </div>
              {/* <div
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
                <span className={`${tab === 'moderator' && 'text-white'}`}>
                  Moderator
                </span>
              </div> */}
            </div>

            <div className=' w-full overflow-x-hidden'>
              {tab === 'members' && <ForumUserDetail />}
              {tab === 'posts' && <ForumPostDetail />}
              {tab === 'events' && <ForumEventDetail />}
              {/* {tab === 'moderator' && <span>Moderator</span>} */}
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

          {openModalEdit && (
            <ModalAddEdit
              open={openModalEdit}
              handleClose={setOpenModalEdit}
              handleAction={handleAddUserToForum}
              loading={loading}
              page='VIEW_FORUM'
            />
          )}
        </>
      )}

      {statusPageDetail === 'NODATA' && (
        <div className='flex-1 flex flex-col items-center justify-center bg-white'>
          <div className='h-52 w-52'>
            <img
              className='h-full w-full'
              src={noData}
              alt='not found search'
            />
          </div>
          <span>We're sorry. We were not able to find a match</span>
        </div>
      )}

      {statusPageDetail === 'LOADING' && (
        <div className='relative flex-1 flex flex-col items-center  h-full  '>
          <div
            role='status'
            className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2'>
            <svg
              aria-hidden='true'
              className='w-10 h-10 text-gray-200 animate-spin fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}

export default ViewForum
