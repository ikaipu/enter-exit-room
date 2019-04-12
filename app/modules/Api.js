import axios from 'axios';
import config from '../config/config';

let token;

export const setToken = (tok: string) => {
  token = tok;
};

export const resolveUrl = (url: string, path: string) =>
  `${url.replace(/^\/+|\/+$/g, '')}/${path.replace(/^\/+|\/+$/g, '')}`;

export const request = (
  httpMethod: string,
  route: string,
  params: Object = {},
) => {
  const method = httpMethod.toLowerCase();
  const url = resolveUrl(config.api_url, route);

  const key = method === 'get' ? 'params' : 'data';
  const baseRequestConfig = {
    method,
    url,
    [key]: params,
  };

  const requestConfig = token
    ? { ...baseRequestConfig, headers: { Authorization: `bearer ${token}` } }
    : baseRequestConfig;

  return axios(requestConfig).then(res => res.data);
};
