import { ComponentPropsWithoutRef } from "react";
import { FormError, FormErrorMessage } from "../message/error";
import styles from "./label.module.css";

type LabelProps = ComponentPropsWithoutRef<"label"> &
  FormError & {
    label?: string;
  };

export function Label({
  children,
  className = "default",
  error,
  htmlFor,
  label,
  ...restProps
}: LabelProps) {
  return (
    <label className={styles[className]} htmlFor={htmlFor} {...restProps}>
      {label}
      {children}
      <FormErrorMessage error={error} />
    </label>
  );
}
