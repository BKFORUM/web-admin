import React, { FC, useEffect } from 'react'
import logo from '../../assets/images/logobkforum.png'
import bgImage from '../../assets/images/bg-login-default.jpg'
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
import TextFieldCustom from '@components/TextField'
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@components/Button/Button'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { authActionSelector, authStateSelector, notifyActionSelector } from '@store/index'
import { useNavigate } from 'react-router-dom'
import { IUserLogin } from '@interfaces/IUser'
import jwt_decode from 'jwt-decode'

interface Props {}

const defaultValues: IUserLogin = {
  email: '',
  password: '',
}

const schema = yup.object().shape({
  email: yup.string().required('Mã sinh viên không được để trống !!!'),
  password: yup.string().required('Mật khẩu không được để trống !!!'),
})

const Login: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { messageError, isLoginSuccess } = useStoreState(authStateSelector)
  const { login, setIsLoginSuccess } = useStoreActions(authActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { handleSubmit, control } = useForm<IUserLogin>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!isLoginSuccess) {
      setNotifySetting({ show: true, status: 'error', message: messageError })
      setIsLoginSuccess(true)
    }
  }, [isLoginSuccess])

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = async (data: IUserLogin) => {
    setIsLoading(true)
    const res = await login(data)
    if (res) {
      setIsLoading(false)
      var decoded: any = jwt_decode(res?.accessToken)
      const user = {
        name: decoded?.fullName,
        exp: decoded?.exp,
        role: decoded?.roles[0],
        access_token: res?.accessToken,
        refresh_token: res?.refreshToken,
      }
      localStorage.setItem('user', JSON.stringify(user))
      setNotifySetting({ show: true, status: 'success', message: 'Login successful' })
      navigate('/forum-management')
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }
  return (
    <div className='h-screen relative'>
      <div className='h-screen'>
        <img
          className='xs:hidden lg:block w-full h-full object-conver'
          src={bgImage}
          alt='bgImage'
        />
        <div className='lg:hidden xs:block bg-gradient-to-b from-[#B1C7FF] via-[#606CE7] to-[#0001CB] w-full min-h-screen z-0'></div>
      </div>
      <div className='absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center '>
        <div>
          <img
            src={logo}
            alt='logo'
          />
        </div>
        <div
          className='bg-white   z-50 mt-5 rounded-[25px]  px-8 pb-14 
        shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
          <h1 className='m-auto font-semibold text-center text-[28px] py-10'>Welcome</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col min-w-[280px] gap-4 sm:container bg-opacity-50'>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldCustom
                  error={error}
                  onChange={onChange}
                  value={value}
                  label='Email *'
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl
                  sx={{
                    width: '100%',
                    '& .MuiFormControl-root': {
                      backgroundColor: '#000',
                    },
                  }}
                  error={!!error}
                  variant='standard'>
                  <InputLabel htmlFor='standard-adornment-password'>
                    Mật khẩu *
                  </InputLabel>
                  <Input
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.01)' }}
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
            {/* <div className='flex justify-end'>
              <span className='text-sm cursor-pointer hover:text-blue-500'>
                Quên mật khẩu?
              </span>
            </div> */}
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
