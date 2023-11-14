import styles from "./style";

interface LoaderProps {
  message?: string;
}

const Loader = ({
  message
}: LoaderProps) => {

  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <div style={styles.loadingInfo}>{message || 'Loading...'}</div>
    </div>
  );
}

export default Loader;