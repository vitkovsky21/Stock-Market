import { configureStore } from "@reduxjs/toolkit";
import StoreReducer from "../Reducers/stock";
import MessageSlice from "../Reducers/message";
import { stockApi } from "../Services/stockApi";
import { tableApi } from "../Services/tableApi";

export function createStore() {
  let preloadedState;
  return configureStore({
    reducer: {
      user: StoreReducer,
      message: MessageSlice,
      [stockApi.reducerPath]: stockApi.reducer,
      [tableApi.reducerPath]: stockApi.reducer,
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware().concat(tableApi.middleware, stockApi.middleware),
    preloadedState,
  });
}

type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
