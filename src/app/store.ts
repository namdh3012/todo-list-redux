import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoReducer from "../features/todo-slice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// const persistedState = localStorage.getItem("reduxState")
//   ? JSON.parse(localStorage.getItem("reduxState") || "{}")
//   : {};

// store.subscribe(() => {
//   localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;