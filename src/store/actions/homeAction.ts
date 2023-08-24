import { AppDispatch } from '..';
import { fetchNewsApi } from 'apiServices/newsApi';
import { News } from 'types/news';
import { HOME_ACTIONS } from './actionTypes';

// Define action creators
export const fetchNewsRequest = () => ({
    type: HOME_ACTIONS.FETCH_NEWS_REQUEST,
});

export const fetchNewsSuccess = (news: News) => ({
    type: HOME_ACTIONS.FETCH_NEWS_SUCCESS,
    payload: news,
});

export const fetchNewsFailure = (error: string) => ({
    type: HOME_ACTIONS.FETCH_NEWS_FAILURE,
    payload: error,
});

// Define async action using Redux Thunk
export const fetchNews = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchNewsRequest());
        try {
            const newsData = await fetchNewsApi();
            dispatch(fetchNewsSuccess(newsData));
        } catch (error) {
            dispatch(fetchNewsFailure(error.message || 'An error occurred'));
        }
    };
};