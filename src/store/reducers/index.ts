import { combineReducers } from 'redux';
import { DetailsReducer } from './DetailsReducer';
import { NewsReducer } from './newsReducer';

const rootReducer = combineReducers({
    news: NewsReducer,
    details: DetailsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
