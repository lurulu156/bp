import axios, { AxiosResponse } from "axios";
import { Scenario } from "../models/scenario";

axios.defaults.baseURL = 'http://localhost:5000/api/v0';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Scenarios = {
  list: () => requests.get<Scenario[]>(`/scenarios`),
  details: (id: string) => requests.get<Scenario>(`/scenarios/${id}`),
  create: (scenario: Scenario) => requests.post<void>(`/scenarios`, scenario),
  update: (scenario: Scenario) => requests.put<void>(`/scenarios/${scenario.id}`, scenario),
  delete: (id: string) => requests.del<void>(`/scenarios/${id}`)
}

const agent = {
  Scenarios
}

export default agent;