import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import store from '@store/index.ts'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StoreProvider store={store}>
        <App />
        <Toaster
          position='top-right'
          reverseOrder={false}
        />
      </StoreProvider>
    </LocalizationProvider>
  </BrowserRouter>,
)
