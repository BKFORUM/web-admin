import axios from "axios";
import jwt_decode from 'jwt-decode'

const BaseURL = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

BaseURL.interceptors.request.use(
  async (config) => {
    const user: any = JSON.parse(String(localStorage.getItem("user")));
    if (user?.access_token !== null && config.url !== '/auth/refresh') {
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
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const res = await refreshToken();
        if (res) {
          var decoded: any = jwt_decode(res?.data?.accessToken)
          const user = {
            name: decoded?.name,
            exp: decoded?.exp,
            role: decoded?.roles[0],
            access_token: res?.data?.accessToken,
            refresh_token: res?.data?.refreshToken,
          }
          localStorage.setItem('user', JSON.stringify(user))
          const access_token = res?.data.accessToken;
          BaseURL.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access_token}`;
          return BaseURL(originalConfig);
        }
      }
    }
    return Promise.reject(err);
  }
);


const refreshToken = async () => {
  try {
    // const auth: any = JSON.parse(String(localStorage.getItem("auth")));
    const user: any = JSON.parse(String(localStorage.getItem("user")));

    const resp = await BaseURL.get("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${user?.refresh_token}`
      }
    })
    return resp;
  } catch (e) {
    console.log("Error", e);
  }
};

export default BaseURL;
