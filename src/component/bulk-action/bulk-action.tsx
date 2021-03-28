import React from "react";
import { useDispatch } from "react-redux";
import { removeChecked } from "../../features/todo-slice";
import ButtonCustom from "../common/button-custom/button-custom";
import styles from "./bulk-action.module.css";

const bulkActionTitle = "Bulk Action";
const doneButtonTitle = "Done";
const removeButtonTitle = "Remove";
export const BulkAction = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.bulkAction}>
      <div className={styles.titleArea}>{bulkActionTitle}</div>
      <div className={styles.groupButton}>
        <ButtonCustom
          className={`${styles.button} ${styles.blue}`}
          title={doneButtonTitle}
          onClick={() => {}}
        />
        <ButtonCustom
          className={`${styles.button} ${styles.red}`}
          title={removeButtonTitle}
          onClick={() => dispatch(removeChecked())}
        />
      </div>
    </div>
  );
};

export default BulkAction;
