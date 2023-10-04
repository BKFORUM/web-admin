import { FC } from 'react'
import { Controller } from 'react-hook-form'

interface IProps {
  name: string
  control: any
  placeholder: string
}

const CustomTextInput = ({ error, onChange, value, placeholder }: any): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='px-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500 w-full'
      />
      {!!error && <span className='text-red-600 text-sm'>{error?.message}</span>}
    </div>
  )
}

const TextFieldV2: FC<IProps> = ({ name, control, placeholder }: IProps): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CustomTextInput
          error={error}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      )}
    />
  )
}

export default TextFieldV2
