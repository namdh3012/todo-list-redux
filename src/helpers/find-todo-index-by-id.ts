import { compose, findIndex, curry, equals } from "ramda";
import { TodoEntity } from "../entities/todo-entity";

import { getTodoId } from "./get-todo-id";

export const findTodoIndexById = curry(
  (todoId: string, todoList: TodoEntity[]) =>
    findIndex(compose(equals(todoId), getTodoId), todoList)
);
