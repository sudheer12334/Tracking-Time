// import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { authReducer } from './Auth/auth.reducer';
// import { projectReducer } from './Projects/project.reducer';

// const rootReducer = combineReducers({
//     auth: authReducer,
//     project: projectReducer
// })

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

import { configureStore } from '@reduxjs/toolkit'
import authReducer  from './Auth/auth.slice'
import { authApi } from './services/auth'
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch