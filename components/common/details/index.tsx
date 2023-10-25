import {ReactNode} from 'react';
import useStyles from "./style";

interface DetailsProps {
  label: string;
  value: ReactNode;
};

const Details = ({
  label,
  value
}: DetailsProps) => {
  const classes = useStyles;
  return (
    <div style={classes.fieldLayout}>
      <div style={classes.fieldLabel}>{label}</div>
      <div style={classes.fieldValue}>{value}</div>
    </div>
  );
}

export default Details;