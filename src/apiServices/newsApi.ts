import { News } from 'types/news';
import { apiConfig } from './constants';
import { getAxios } from './index';

export const fetchNewsApi = async (): Promise<News> => {
    const response: any = await getAxios(apiConfig.everything);
    return { ...response };
}