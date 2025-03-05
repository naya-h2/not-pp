import axios from 'axios';

const BASE_URL = '/api';

// 인증 헤더 x
export const instance = axios.create({ baseURL: BASE_URL });

// 인증 헤더 o
export const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: 'Bearer ' + localStorage.getItem('npp-access') },
});
