import React, { FC } from 'react'
import logo from '../../assets/images/logobkforum.png'
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  FormHelperText,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useForm } from 'react-hook-form'
import TextFieldCustom from '@components/TextField'
import { Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@components/Button/Button'
import { useStoreActions } from 'easy-peasy'
import { authActionSelector } from '@store/index'
import { useNavigate } from 'react-router-dom'

interface Props {}
interface IFormInput {
  maSinhVien: string
  passWord: string
}

const defaultValues: IFormInput = {
  maSinhVien: '',
  passWord: '',
}

const schema = yup.object().shape({
  maSinhVien: yup.string().required('Mã sinh viên không được để trống !!!'),
  passWord: yup.string().required('Mật khẩu không được để trống !!!'),
})

const Login: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { login } = useStoreActions(authActionSelector)
  // const { isLoginSuccess } = useStoreState(authStateSelector)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { handleSubmit, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = async (data: IFormInput) => {
    console.log(data)
    setIsLoading(true)
    const res = await login()
    if (res) {
      setIsLoading(false)
      navigate('/')
      console.log(res)
    }
  }
  return (
    <div className='min-h-screen relative'>
      <div className='min-h-screen'>
        {/* <img
          className='w-full h-full'
          src={bgImage}
          alt='bgImage'
        /> */}
        <div className='bg-gradient-to-b from-[#B1C7FF] via-[#606CE7] to-[#0001CB] w-full min-h-screen z-0'></div>
      </div>
      <div className='absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center '>
        <div>
          <img
            src={logo}
            alt='logo'
          />
        </div>
        <div
          className='bg-white z-50 mt-10 rounded-[25px] opacity-100 px-8 pb-14 
        shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
          <h1 className='m-auto font-semibold text-center text-[28px] py-10'>Welcome</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col min-w-[320px] gap-4 sm:container'>
            <TextFieldCustom
              name='maSinhVien'
              control={control}
              label='Mã sinh viên *'
            />
            <Controller
              name='passWord'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl
                  sx={{ width: '100%' }}
                  error={!!error}
                  variant='standard'>
                  <InputLabel htmlFor='standard-adornment-password'>
                    Mật khẩu *
                  </InputLabel>
                  <Input
                    id='standard-adornment-password'
                    name='passWord'
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!!error && (
                    <FormHelperText id='component-error-text'>
                      {error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <div className='flex justify-end'>
              <span className='text-sm cursor-pointer hover:text-blue-500'>
                Quên mật khẩu?
              </span>
            </div>
            <Button
              typeButton='blue'
              className='mt-10'
              disabled={isLoading}
              loading={isLoading}>
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
