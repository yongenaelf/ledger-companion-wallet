import { ReactNode } from 'react';
import { Flex } from "antd";
import useStyles from "./style";

interface FromFieldProps {
  children: ReactNode;
  label: string;
  labelWidth?: number;
}

const FromField = ({
  children,
  label,
  labelWidth = 108,
}: FromFieldProps) => {
  const classes = useStyles;
  return (
    <Flex style={classes.fieldContainer}>
      <Flex style={{...classes.labelContainer, width: `${labelWidth}px`}}>{label}</Flex>
      <Flex style={classes.valueContainer}>{children}</Flex>
    </Flex>
  );
}

export default FromField;