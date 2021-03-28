import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RootState } from "../app/store";
import { TodoEntity } from "../entities/todo-entity";
import { findTodoIndexById } from "../helpers/find-todo-index-by-id";

interface TodoState {
  todoList: TodoEntity[];
}

const initialState: TodoState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "{}")
  : {
      todoList: [],
    };

export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoEntity>) => {
      const todoNew = action.payload;
      todoNew.id = uuid();
      state.todoList.push(todoNew);
      state.todoList = state.todoList.sort(function (todo1, todo2) {
        return (todo1.dueDate ?? 0) - (todo2.dueDate ?? 0);
      });
    },
    remove: (state, action: PayloadAction<string>) => {
      const index = findTodoIndexById(
        action.payload ?? "",
        state.todoList ?? []
      );
      state.todoList.splice(index, 1);
    },
    showDetails: (state, action: PayloadAction<string>) => {
      state.todoList.map((todo) => {
        if (todo.id === action.payload) {
          if (todo.isShowDetail === false) {
            todo.isShowDetail = true;
            return todo;
          }
        }
        todo.isShowDetail = false;
        return todo;
      });
    },
    search: (state, action: PayloadAction<string>) => {
      const containText = new RegExp(`.*${action.payload}.*`, "i");
      state.todoList.map((todo) => {
        if (action.payload === "" || containText.test(todo.title + "")) {
          todo.isVisible = true;
          return todo;
        }
        todo.isVisible = false;
        return todo;
      });
    },
    check: (state, action: PayloadAction<string>) => {
      state.todoList.map((todo) => {
        if (todo.id === action.payload) {
          if (todo.isChecked === true) {
            todo.isChecked = false;
          } else {
            todo.isChecked = true;
          }
        }
        return todo;
      });
    },
    update: (state, action: PayloadAction<TodoEntity>) => {
      const index = findTodoIndexById(action.payload.id ?? "", state.todoList);
      action.payload.isShowDetail = false;
      state.todoList[index] = action.payload;
      state.todoList = state.todoList.sort(function (todo1, todo2) {
        return (todo1.dueDate ?? 0) - (todo2.dueDate ?? 0);
      });
    },
    removeChecked: (state) => {
      state.todoList = state.todoList.filter((todo) => !todo.isChecked);
    },
  },
});

export const {
  add,
  remove,
  showDetails,
  search,
  check,
  update,
  removeChecked,
} = todoSlice.actions;

export const selectTodoList = (state: RootState) => state.todo.todoList;

export default todoSlice.reducer;
