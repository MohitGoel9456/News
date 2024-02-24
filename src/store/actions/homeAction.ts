import { AppDispatch } from '..';
import { Article, News } from 'types/news';
import { HOME_ACTIONS } from './actionTypes';
import { getTopNewsFromDb } from 'services/storageServices';
import { fetchNewsFromServer, getLatestFromDb } from 'middleware/middleware';

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

export const fetchTop5FromDB = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const storedHeadlines = await getTopNewsFromDb('articles');
            console.log("storedHeadlines", storedHeadlines)
            dispatch(fetchTopHeadlinesFormDB(storedHeadlines));
        }
        catch (error) {
            dispatch(fetchNewsFailure(error.message || 'An error occurred'));
        }
    }
}

export const getNews = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: HOME_ACTIONS.FETCH_NEWS_REQUEST
    })
    try {
        const newsFromDB = await getLatestFromDb();
        const getLastestNews = await fetchNewsFromServer();
        if (newsFromDB) {
            dispatch({
                type: HOME_ACTIONS.FETCH_NEWS_SUCCESS,
                payload: newsFromDB,
            })
        }
        if (getLastestNews) {
            dispatch({
                type: HOME_ACTIONS.FETCH_NEWS_REQUEST_SUCCESS,
                payload: getLastestNews
            })
        }
    } catch (err) {
        console.log("errr from getNews", err);
    }
}