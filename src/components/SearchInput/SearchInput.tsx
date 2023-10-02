import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { FC } from 'react'

interface IProps {
  value: string
  setValue: (value: string) => void
}

const SearchInput: FC<IProps> = ({ value, setValue }: IProps): JSX.Element => {
  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: 12,
        bgcolor: '#E6F0F6',
      }}>
      <IconButton
        type='button'
        sx={{ p: '10px' }}
        aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, pr: '10px' }}
        name='searchInput'
        placeholder='Search by name'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Paper>
  )
}

export default SearchInput
