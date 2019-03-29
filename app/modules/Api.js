import axios from 'axios';
import config from '../config/config';

export const get = (route: string, params: Object = {}) => {
  const url = `${config.api_url}/${route}`;

  return axios
    .get(url, {
      params,
    })
    .then(res => res.data);
};

export default {
  get,
};
