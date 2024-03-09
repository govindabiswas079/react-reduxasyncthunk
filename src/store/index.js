import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './reducers/postsReducer'
import contentReducer from './reducers/contentReducer'


export const store = configureStore({
    reducer: {
        posts: postsReducer,
        content: contentReducer,
    },
})
