import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/myslice";
import todoReducer from "./redux/todoslice"
const store = configureStore({
  reducer: {userReducer,todoReducer},
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
