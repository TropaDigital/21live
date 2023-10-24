import axios from 'axios';

let baseUrl;

if (process.env.NODE_ENV === 'development') {
  // baseUrl = 'http://192.168.15.9:33332/';
  // baseUrl = 'http://21live.backendtropa.com.br/';
  baseUrl = 'http://ec2-3-93-44-139.compute-1.amazonaws.com:3000/';
} else {
  // baseUrl = 'https://21live.backendtropa.com.br/';
  baseUrl = 'http://ec2-3-93-44-139.compute-1.amazonaws.com:3000/';
}

const api = axios.create({
  baseURL: baseUrl
});

export default api;
