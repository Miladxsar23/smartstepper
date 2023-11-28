import styles from './react.module.css';

/* eslint-disable-next-line */
export interface ReactProps {}

export function React(props: ReactProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to React!</h1>
    </div>
  );
}

export default React;
