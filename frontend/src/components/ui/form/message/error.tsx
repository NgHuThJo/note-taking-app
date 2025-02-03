import styles from "./error.module.css";

export type FormError = {
  error: string[] | string;
};

type ErrorProps = FormError;

export function FormErrorMessage({ error }: ErrorProps) {
  return typeof error === "string" ? (
    <p className={styles.error}>{error}</p>
  ) : (
    error?.map((message) => <p className={styles.error}>{message}</p>)
  );
}
