import { configureStore } from '@reduxjs/toolkit';
import subredditsReducer from './components/SubredditMenu/SubredditSlice';
import searchReducer from './components/Header/SearchSlice';

export default configureStore({
    reducer: {
        subreddits: subredditsReducer,
        search: searchReducer
    }
});