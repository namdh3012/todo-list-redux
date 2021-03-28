import React from "react";
import styles from "./input-custom.module.css";

interface InputCustomProps {
  value?: string;
  className?: string;
  placeholder?: string;
  onChange: (event: any) => void;
}

export const InputCustom = (props: InputCustomProps) => {
  return (
    <>
      <input
        type="text"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className={`${styles.input} ${props.className}`}
        placeholder={props.placeholder}
      />
    </>
  );
};

export default InputCustom;
