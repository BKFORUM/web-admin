import { IOption } from '@interfaces/ITopics'
import { Autocomplete, TextField } from '@mui/material'
import { FC } from 'react'
interface IProps {
  value: any
  onChange: any
  placeholder: string
  options: IOption[]
  error: any
  disabled?: boolean
}

const AutocompleteCustom: FC<IProps> = ({
  value,
  error,
  placeholder,
  onChange,
  options,
  disabled,
}: IProps): JSX.Element => {
  const defaultOption = { id: '', name: 'None' }
  const updatedOptions = [defaultOption, ...options]
  return (
    <>
      <Autocomplete
        id='combo-box-demo'
        size='small'
        disabled={disabled}
        options={updatedOptions}
        onChange={(event, option) => {
          console.log(event)
          if (option === null) onChange('')
          else onChange(option.id)
        }}
        value={value}
        getOptionLabel={(option) => {
          const data = options.find(
            (item: IOption) => option === item.id || option?.id === item.id,
          )
          return data?.name || ''
        }}
        renderOption={(props, option) => {
          return (
            <li
              {...props}
              key={option?.name}>
              {option?.name}
            </li>
          )
        }}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall ': {
            paddingTop: '8px',
            paddingBottom: '8px',
            borderRadius: '6px',
            backgroundColor: '#E6F0F6',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: !!error ? '1px solid red' : 'none',
          },
        }}
        isOptionEqualToValue={(option, value) => {
          return option.id === value
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant='outlined'
          />
        )}
      />
      {!!error && <span className='text-red-600 text-sm'>{error?.message}</span>}
    </>
  )
}

export default AutocompleteCustom
