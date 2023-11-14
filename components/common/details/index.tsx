import {ReactNode} from 'react';
import styles from "./style";

interface DetailsProps {
  label: string;
  value: ReactNode;
};

const Details = ({
  label,
  value
}: DetailsProps) => {
  return (
    <div style={styles.fieldLayout}>
      <div style={styles.fieldLabel}>{label}</div>
      <div style={styles.fieldValue}>{value}</div>
    </div>
  );
}

export default Details;