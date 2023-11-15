import {ReactNode} from 'react';
import styles from "./style.module.css";

interface DetailsProps {
  label: string;
  value: ReactNode;
};

const Details = ({
  label,
  value
}: DetailsProps) => {
  return (
    <div className={styles.fieldLayout}>
      <div className={styles.fieldLabel}>{label}</div>
      <div className={styles.fieldValue}>{value}</div>
    </div>
  );
}

export default Details;