import { combineReducers } from 'redux';
import { NewsReducer } from './newsReducer';

const rootReducer = combineReducers({
    news: NewsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
