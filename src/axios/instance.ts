import axios, { AxiosError } from 'axios';

const BASE_URL = '/api';

// 인증 헤더 x
export const instance = axios.create({ baseURL: BASE_URL });
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error;
  }
);

// 인증 헤더 o
export const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: 'Bearer ' + localStorage.getItem('npp-access') },
});

authInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    //auth
    try {
      if (error.status === 401) {
        const { data, status } = await axios.post(
          `${BASE_URL}/auth/login/refresh-token`,
          { refresh: localStorage.getItem('npp-refresh') },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('npp-access'),
            },
          }
        );

        if (status === 200) {
          localStorage.setItem('npp-access', data.access);
          localStorage.setItem('npp-refresh', data.refresh);
        }
      }
      if (error.status === 500) {
        window.alert('서버 장애 발생\n잠시 후 다시 시도해 주세요.');
      }
    } catch (err: any) {
      if (err.status === 401) {
        localStorage.removeItem('npp-access');
        localStorage.removeItem('npp-refresh');

        window.alert('로그인이 필요한 기능입니다.');
        window.location.href = '/';
      } else if (error.status === 500) {
        window.alert('서버 장애 발생\n잠시 후 다시 시도해 주세요.');
      }
    }
  }
);
