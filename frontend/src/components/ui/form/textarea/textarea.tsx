import { ComponentPropsWithoutRef } from "react";
import { FormError, FormErrorMessage } from "../message/error";
import styles from "./textarea.module.css";

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & FormError;

export function TextArea({
  className = "default",
  error,
  name,
  ...restProps
}: TextAreaProps) {
  return (
    <div className={styles[className]}>
      <textarea id={name} name={name} {...restProps}></textarea>
      {typeof error === "string" ? (
        <FormErrorMessage error={error} />
      ) : (
        error?.map((message, index) => (
          <FormErrorMessage error={message} key={index} />
        ))
      )}
    </div>
  );
}
