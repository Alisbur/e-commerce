import axios from 'axios';
import { BASE_URL } from './api-routes';
import { JWT } from 'api/config/jwt';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${JWT}`,
    'Content-type': 'application/json',
  },
});
