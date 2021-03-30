import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoReducer from "../features/todo-slice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("user", JSON.stringify(store.getState().todo));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


