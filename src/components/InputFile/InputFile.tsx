import { FC } from 'react'

interface Props {}

const InputFile: FC<Props> = ({ onChange }: any): JSX.Element => {
  return (
    <div>
      <input
        type='file'
        className='px-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500 w-full'
        // onChange={(e) => onChange(e.target.files[0])}
      />
    </div>
  )
}

export default InputFile
