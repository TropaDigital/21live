import axios from 'axios';

let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.15.13:33332/';
  // baseUrl = 'https://21live.backendtropa.com.br/';
} else {
  baseUrl = 'https://21live.backendtropa.com.br/';
}

const api = axios.create({
  baseURL: baseUrl
});

export default api;
