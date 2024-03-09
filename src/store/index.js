import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query'
// import storage from 'redux-persist/lib/storage/session';
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import postsReducer from './reducers/postsReducer'
import contentReducer from './reducers/contentReducer'

const encryptor = encryptTransform({
    secretKey: "my-super-secret-key-999",
    onError: function (error) {
        console.log('error', error)
    },
})

const persistConfig = {
    key: 'posts',
    storage,
    // transforms: [encryptor],
}

const persistedPosts = persistReducer(persistConfig, postsReducer)
const persistedContent = persistReducer({
    key: 'content',
    storage,
}, contentReducer)

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        // content: contentReducer,
        content: persistedContent,
        persisted: persistedPosts,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)