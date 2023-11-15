import styles from "./style.module.css";

interface LoaderProps {
  message?: string;
}

const Loader = ({
  message
}: LoaderProps) => {

  return (
    <div className={styles.loaderContainer}>
      <div className='spinner'></div>
      <div className={styles.loadingInfo}>{message || 'Loading...'}</div>
    </div>
  );
}

export default Loader;