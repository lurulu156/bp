import axios, { AxiosError, AxiosResponse } from "axios";
import { Scenario, ScenarioFormValues } from "../models/scenario";
import { router } from "../router/Routes";
import { toast } from 'react-toastify';
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Photo, Profile, UserScenario } from "../models/profile";
import { PaginatedResult } from "../models/pagination";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

axios.interceptors.response.use(async response => {
  if (process.env.NODE_ENV === 'development') await sleep(1000);
  const pagination = response.headers['pagination'];
  if (pagination) {
    response.data = new PaginatedResult(response.data, JSON.parse(pagination));
    return response as AxiosResponse<PaginatedResult<any>>
  }
  return response;
}, (error: AxiosError) => {
  const { data, status, config } = error.response as AxiosResponse;
  switch (status) {
    case 400:
      if (config.method === 'get' && data.errors?.hasOwnProperty('id')) {
        router.navigate('/not-found');
      }
      if (data.errors) {
        const modalStateErrors = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modalStateErrors.push(data.errors[key])
          }
        }
        throw modalStateErrors.flat();
      } else {
        toast.error(data);
      }
      break;
    case 401:
      toast.error('unauthorised')
      break;
    case 403:
      toast.error('forbidden')
      break;
    case 404:
      router.navigate('/not-found');
      break;
    case 500:
      store.commonStore.setServerError(data);
      router.navigate('/server-error');
      break;
  }
})

const Account = {
  current: () => requests.get<User>('account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: any) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post<Photo>('photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
  updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) => requests
    .get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
  listScenarios: (username: string, predicate: string) =>
    requests.get<UserScenario[]>(`/profiles/${username}/scenarios?predicate=${predicate}`)
}

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Scenarios = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Scenario[]>>('/scenarios', { params })
    .then(responseBody),
  details: (id: string) => requests.get<Scenario>(`/scenarios/${id}`),
  create: (scenario: ScenarioFormValues) => requests.post<void>(`/scenarios`, scenario),
  update: (scenario: ScenarioFormValues) => requests.put<void>(`/scenarios/${scenario.id}`, scenario),
  delete: (id: string) => requests.del<void>(`/scenarios/${id}`),
  attend: (id: string) => requests.post<void>(`/scenarios/${id}/attend`, {})
}

const agent = {
  Scenarios,
  Account,
  Profiles
}

export default agent;