import { ReactNode } from 'react';
import { InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Tooltip, Typography } from "antd";
import styles from "./style.module.css";

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
    <Flex className={styles.fieldContainer}>
      <Flex className={styles.labelContainer} style={{width: `${labelWidth}px`}}>
        {label}
        {tooltipMessage && <Tooltip color='#014795' title={tooltipMessage}>
          <InfoCircleOutlined
            style={{
              color: 'rgba(0,0,0,.45)',
            }}
          />
        </Tooltip>}
      </Flex>
      <Flex className={styles.valueContainer}>{children || <Typography.Text disabled className={styles.noValue}>Empty</Typography.Text>}</Flex>
    </Flex>
  );
}

export default FromField;