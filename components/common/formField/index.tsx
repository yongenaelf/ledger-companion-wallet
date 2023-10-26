import { ReactNode } from 'react';
import { InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Tooltip } from "antd";
import useStyles from "./style";

interface FromFieldProps {
  children: ReactNode;
  label: string;
  labelWidth?: number;
  tooltipMessage?: string;
}

const FromField = ({
  children,
  label,
  labelWidth = 120,
  tooltipMessage,
}: FromFieldProps) => {
  const classes = useStyles;
  return (
    <Flex style={classes.fieldContainer}>
      <Flex style={{...classes.labelContainer, width: `${labelWidth}px`}}>
        {label}
        {tooltipMessage && <Tooltip color='#014795' title={tooltipMessage}>
          <InfoCircleOutlined
            style={{
              color: 'rgba(0,0,0,.45)',
            }}
          />
        </Tooltip>}
      </Flex>
      <Flex style={classes.valueContainer}>{children}</Flex>
    </Flex>
  );
}

export default FromField;