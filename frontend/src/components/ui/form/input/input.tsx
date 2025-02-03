import { ComponentPropsWithRef } from "react";
import { Label } from "../label/label";
import { FormError } from "#frontend/components/ui/form/message/error";
import styles from "./input.module.css";

type InputProps = ComponentPropsWithRef<"input"> &
  FormError & {
    inputClassName?: string;
    label?: string;
    labelClassName?: string;
  };

export function Input({
  error,
  inputClassName = "default",
  label,
  labelClassName,
  name,
  type,
  ...restProps
}: InputProps) {
  return (
    <Label
      className={labelClassName}
      error={error}
      htmlFor={name}
      label={label}
    >
      <input
        className={styles[inputClassName]}
        id={name}
        name={name}
        type={type}
        {...restProps}
      />
    </Label>
  );
}
