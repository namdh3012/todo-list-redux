import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import ButtonCustom from "../../component/common/button-custom/button-custom";
import InputCustom from "../../component/common/input-custom/input-custom";
import PriorityType from "../../constants/priority-type";
import { TodoEntity } from "../../entities/todo-entity";
import { add, update } from "../../features/todo-slice";
import styles from "./create-edit-todo.module.css";
import calendarIcon from "../../assets/calendar-icon.svg";

export interface CreateEditTodoProps {
  todo?: TodoEntity;
}

const placeholderAdd = "Add new task...";
const placeholderEdit = "Edit task...";
const titleDescription = "Description";
const titleDueDate = "Due Date";
const titlePriority = "Priority";
const labelButtonAdd = "Add";
const labelButtonUpdate = "Update";

const defaultValue = {
  id: "",
  title: "",
  description: "",
  priority: PriorityType.Normal,
};

export const CreateEditTodo = (props: CreateEditTodoProps) => {
  const [classError, setClassError] = useState("");
  const [title, setTitle] = useState(props.todo?.title ?? "");
  const [description, setDescription] = useState(props.todo?.description ?? "");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState(
    props.todo?.priority ?? PriorityType.Normal
  );

  useEffect(() => {
    if (props.todo?.dueDate) {
      setDueDate(new Date(props.todo?.dueDate));
    }
  }, [props.todo]);

  const dispatch = useDispatch();

  useEffect(() => {
    setClassError("");
  }, [title]);

  const handleSaveTodo = () => {
    if (!title.trim()) {
      setClassError(styles.error);
      return;
    }
    if (props.todo) {
      dispatch(
        update({
          title: title.trim(),
          description,
          dueDate: dueDate.getTime(),
          priority,
          id: props.todo.id,
          isDone: props.todo.isDone,
          isShowDetail: props.todo.isShowDetail,
          isVisible: props.todo.isVisible,
        })
      );
    } else {
      dispatch(
        add({
          title: title.trim(),
          description,
          dueDate: dueDate.getTime(),
          priority,
          id: "",
          isDone: false,
          isShowDetail: false,
          isVisible: true,
        })
      );
    }
    setTitle(defaultValue.title);
    setDescription(defaultValue.description);
    setDueDate(new Date());
    setPriority(PriorityType.Normal);
  };

  return (
    <div className={props.todo ? `${styles.container}` : ""}>
      <InputCustom
        onChange={setTitle}
        value={title}
        className={`${styles.input} ${classError.trim()}`}
        placeholder={props.todo ? placeholderEdit : placeholderAdd}
      />
      <div className={styles.label}>{titleDescription}</div>
      <textarea
        className={styles.textArea}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className={styles.picker}>
        <div className={styles.inlineBlock}>
          <div className={styles.label}>{titleDueDate}</div>
          <DatePicker
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
            closeOnScroll={true}
            dateFormat="dd MMM yyyy"
            startDate={new Date()}
            minDate={new Date()}
            dateFormatCalendar={"MMM yyyy"}
            customInput={React.createElement(CustomInputCalendar)}
          />
        </div>
        <div className={styles.inlineBlock}>
          <div className={styles.label}>{titlePriority}</div>
          <select
            className={styles.select}
            value={priority}
            onChange={(option) => setPriority(option.target.value)}
          >
            {Object.keys(PriorityType).map((priorityKey) => {
              return (
                <option key={priorityKey} value={priorityKey}>
                  {priorityKey}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <ButtonCustom
        className={styles.buttonAdd}
        title={props.todo ? labelButtonUpdate : labelButtonAdd}
        onClick={handleSaveTodo}
      />
    </div>
  );
};

export default CreateEditTodo;

const CustomInputCalendar = ({
  value,
  onClick,
}: {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => (
  <button className={styles.customInputCalendar} onClick={onClick}>
    <div className={styles.valueCustomInput}>{value}</div>
    <div className={styles.icon}>
      <img className={styles.image} src={calendarIcon} alt="" />
    </div>
  </button>
);
