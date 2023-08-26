import { AppDispatch } from '..';
import { Article, News } from 'types/news';
import { HOME_ACTIONS } from './actionTypes';
import { getTopNewsFromDb } from 'services/storageServices';
import { ifNoInternetConnectionReturnDataFromDB } from 'middleware/middleware';

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

export const fetchTopHeadlinesFormDB = (articles: Article[]) => ({
    type: HOME_ACTIONS.FETCH_NEWS_FROM_DB,
    payload: articles,
})

// Define async action using Redux Thunk
export const fetchNews = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchNewsRequest());
        try {
            const finalData = await ifNoInternetConnectionReturnDataFromDB();
            dispatch(fetchNewsSuccess(finalData));
        } catch (error) {
            dispatch(fetchNewsFailure(error.message || 'An error occurred'));
        }
    };
};



export const fetchTop5FromDB = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const storedHeadlines = await getTopNewsFromDb('articles');
            dispatch(fetchTopHeadlinesFormDB(storedHeadlines));
        }
        catch (error) {
            dispatch(fetchNewsFailure(error.message || 'An error occurred'));
        }
    }
}