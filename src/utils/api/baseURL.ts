// import IsTokenValid from "@utils/functions/isValidToken";
import { authActionSelector, authStateSelector, notifyActionSelector } from "@store/index";
import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import jwt_decode from 'jwt-decode'

const { refreshToken } = useStoreActions(authActionSelector)
const { messageError } = useStoreState(authStateSelector)
const { setNotifySetting } = useStoreActions(notifyActionSelector)

const BaseURL = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

BaseURL.interceptors.request.use(
  async (config) => {
    const user: any = localStorage.getItem("user");
    if (user?.access_token !== null) {
      config.headers.Authorization = `Bearer ${user?.access_token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// after send request
BaseURL.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const res = await refreshToken()
        if (res) {
          var decoded: any = jwt_decode(res?.accessToken)
          const user = {
            name: decoded?.name,
            // email: decoded?.email,
            exp: decoded?.exp,
            role: decoded?.roles[0],
            access_token: res?.accessToken,
            refresh_token: res?.refreshToken,
          }
          localStorage.setItem('user', JSON.stringify(user))
          setNotifySetting({ show: true, status: 'success', message: 'Login successful' })
        } else {
          console.log('error', messageError)
          setNotifySetting({ show: true, status: 'error', message: messageError })
        }
      }
    }

    return Promise.reject(err);
  }
);

export default BaseURL;
