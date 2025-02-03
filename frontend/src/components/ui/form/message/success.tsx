import styles from "./error.module.css";

type FormSuccessMessageProps = {
  success: string[] | string;
};

export function FormSuccessMessage({ success }: FormSuccessMessageProps) {
  return <p className={styles.error}>{success}</p>;
}
