export class TodoEntity {
  id?: string;
  title?: string;
  description?: string;
  dueDate?: number;
  priority?: string;
  isVisible?: boolean;
  isDone?: boolean;
  isShowDetail?: boolean;
  isChecked?: boolean;

  constructor(data?: any) {
    return Object.assign(this, data || {});
  }
}
