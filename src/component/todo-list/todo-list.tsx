import React from "react";
import { useDispatch, useSelector } from "react-redux";
import commonStyles from "../../App.module.css";
import { TodoEntity } from "../../entities/todo-entity";
import { search, selectTodoList } from "../../features/todo-slice";
import InputCustom from "../common/input-custom/input-custom";
import Todo from "../todo/todo";
import styles from "./todo-list.module.css";

const searchInputPlaceholder = "Search...";

export const TodoList = () => {
  const todoList = useSelector(selectTodoList);
  const dispatch = useDispatch();

  return (
    <>
      <div className={commonStyles.alignCenter}>
        <div className={styles.inputSearch}>
          <InputCustom
            placeholder={searchInputPlaceholder}
            onChange={(event) => dispatch(search(event))}
            className={styles.input}
          />
        </div>
        <div className={styles.taskList}>
          {todoList &&
            todoList
              .filter((todo) => todo.isVisible)
              .map((todo: TodoEntity) => {
                return <Todo key={todo.id} todo={todo} />;
              })}
        </div>
      </div>
    </>
  );
};

export default TodoList;
