import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://withered-feather-36062.botics.co/api/v1',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default Axios;
