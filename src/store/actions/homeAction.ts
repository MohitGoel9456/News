import { AppDispatch } from '..';
import { fetchNewsApi } from 'services/apiServices/newsApi';
import { Article, News } from 'types/news';
import { HOME_ACTIONS } from './actionTypes';
import { getTop5ValuesFromDb, saveData } from 'services/storageServices';
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
    console.log("news -- fatch news");
    return async (dispatch: AppDispatch) => {
        dispatch(fetchNewsRequest());
        try {
            const newsData = await fetchNewsApi();
            const finalData: News = {
                ...newsData,
                articles: newsData.articles.slice(0, 10),
            };
            const result = await saveData('articles', newsData.articles.slice(10));
            console.log("result --", result);
            dispatch(fetchNewsSuccess(finalData));
        } catch (error) {
            dispatch(fetchNewsFailure(error.message || 'An error occurred'));
        }
    };
};

export const fetchTop5FromDB = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const storedHeadlines = await getTop5ValuesFromDb('articles');
            dispatch(fetchTopHeadlinesFormDB(storedHeadlines));
        }
        catch (error) {
            dispatch(fetchNewsFailure(error.message || 'An error occurred'));
        }
    }
}