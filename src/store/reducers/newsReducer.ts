import { HOME_ACTIONS } from "store/actions/actionTypes";
import { NewsState } from "types/news";

const initialState: NewsState = {
    loading: false,
    error: '',
    news: {
        articles: [],
        status: ''
    },
};

export const NewsReducer = (state = initialState, action: any): NewsState => {
    switch (action.type) {
        case HOME_ACTIONS.FETCH_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
            };
        case HOME_ACTIONS.FETCH_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                news: action.payload,
            };
        case HOME_ACTIONS.FETCH_NEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case HOME_ACTIONS.FETCH_NEWS_FROM_DB:
            return {
                ...state,
                loading: false,
                news: {
                    ...state.news,
                    articles: [...action.payload, ...state.news.articles]
                }
            };
        default:
            return state;
    }
};
