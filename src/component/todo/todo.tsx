import React from "react";
import { useDispatch } from "react-redux";
import { TodoEntity } from "../../entities/todo-entity";
import { remove, check, showDetails } from "../../features/todo-slice";
import ButtonCustom from "../common/button-custom/button-custom";
import { CreateEditTodo } from "../create-edit-todo/create-edit-todo";
import styles from "./todo.module.css";

const detailButtonTitle = "Detail";
const removeButtonTitle = "Remove";

export interface TaskProps {
  todo: TodoEntity;
}

export const Todo = (props: TaskProps) => {
  const { todo } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.todo}>
        <div className={styles.checkBox}>
          <input
            type="checkbox"
            checked={todo.isChecked}
            onChange={() => dispatch(check(todo.id ?? ""))}
          />
        </div>
        <div className={styles.taskName}>{todo?.title}</div>
        <div className={styles.groupButton}>
          <ButtonCustom
            className={`${styles.button} ${styles.blue}`}
            title={detailButtonTitle}
            onClick={() => dispatch(showDetails(todo.id ?? ""))}
          />
          <ButtonCustom
            className={`${styles.button} ${styles.red}`}
            title={removeButtonTitle}
            onClick={() => dispatch(remove(todo.id ?? ""))}
          />
        </div>
      </div>
      {todo?.isShowDetail && (
        <div className={styles.detail}>
          <CreateEditTodo todo={todo} />
        </div>
      )}
    </>
  );
};

export default Todo;
