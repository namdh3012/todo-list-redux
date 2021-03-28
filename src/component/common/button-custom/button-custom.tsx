import React from "react";
import styles from "./button-custom.module.css";

interface ButtonCustomProps {
  className?: string;
  title?: string;
  onClick: () => void;
}

export const ButtonCustom = (props: ButtonCustomProps) => {
  return (
    <>
      <button
        className={`${styles.buttonAdd} ${props.className}`}
        title={props.title}
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </>
  );
};

export default ButtonCustom;
