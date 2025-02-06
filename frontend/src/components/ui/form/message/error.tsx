import styles from "./error.module.css";

export type FormError = {
  error: string[] | string;
};

type ErrorProps = FormError;

export function FormErrorMessage({ error }: ErrorProps) {
  return typeof error === "string" ? (
    <p className={styles.error}>{error}</p>
  ) : (
    error?.map((message, index) => (
      <p className={styles.error} key={index}>
        {message}
      </p>
    ))
  );
}
