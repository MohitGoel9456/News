import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { apiConfig } from './constants';
import { Header } from './header';

const ApiService: AxiosInstance = axios.create({
    baseURL: apiConfig.BASE_URL,
    headers: Header(),
    timeout: 5000,
})

ApiService.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    return req
})

ApiService.interceptors.response.use((res: AxiosResponse) => {
    return res;
})

async function getAxios<T>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.get(url, { params });
    return response.data;
}

async function postAxios<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.post(url, data);
    return response.data;
}
async function putAxios<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.post(url, data);
    return response.data;
}

async function deleteAxios<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.post(url);
    return response.data;
}

export {
    getAxios,
    postAxios,
    putAxios,
    deleteAxios
}

