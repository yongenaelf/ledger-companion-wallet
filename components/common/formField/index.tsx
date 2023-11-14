import { ReactNode } from 'react';
import { InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Tooltip, Typography } from "antd";
import styles from "./style";

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
  return (
    <Flex style={styles.fieldContainer}>
      <Flex style={{...styles.labelContainer, width: `${labelWidth}px`}}>
        {label}
        {tooltipMessage && <Tooltip color='#014795' title={tooltipMessage}>
          <InfoCircleOutlined
            style={{
              color: 'rgba(0,0,0,.45)',
            }}
          />
        </Tooltip>}
      </Flex>
      <Flex style={styles.valueContainer}>{children || <Typography.Text disabled style={styles.noValue}>Empty</Typography.Text>}</Flex>
    </Flex>
  );
}

export default FromField;