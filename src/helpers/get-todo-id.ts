import { propOr } from "ramda";

export const getTodoId = propOr("", "id");
