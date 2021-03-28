import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./App.module.css";
import BulkAction from "./component/bulk-action/bulk-action";
import { CreateEditTodo } from "./component/create-edit-todo/create-edit-todo";
import TodoList from "./component/todo-list/todo-list";
import { TodoEntity } from "./entities/todo-entity";
import { selectTodoList } from "./features/todo-slice";

const titleNewTask = "New Task";
const titleTodoList = "To Do List";

const App = () => {
  const todoList = useSelector(selectTodoList);

  const findCheckedTask = (todo: TodoEntity) => {
    return todo.isChecked;
  };

  const isShowPopup = useMemo(() => {
    return todoList.some(findCheckedTask);
  }, [todoList]);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <div className={styles.createTaskArea}>
          <div className={styles.title}>{titleNewTask}</div>
          <div className={styles.alignCenter}>
            <CreateEditTodo />
          </div>
        </div>
        <div className={styles.taskListArea}>
          <div className={styles.title}>{titleTodoList}</div>
          <TodoList />
          {isShowPopup && <BulkAction />}
        </div>
      </div>
    </div>
  );
};

export default App;
