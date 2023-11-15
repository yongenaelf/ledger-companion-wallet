import { ReactNode } from 'react';
import { Card, Typography } from "antd";
import styles from "./style.module.css";

const bodyStyles = {
  widgetLayout: {
    background: '#fff',
    padding: '24px',
    borderRadius: '8px',
  }
}
interface PaperLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: ReactNode;
  externalClasses?: string;
}
const PaperLayout = ({
  children,
  title,
  subtitle,
  externalClasses,
}: PaperLayoutProps) => {
  return (
    <Card bodyStyle={bodyStyles.widgetLayout} style={{minHeight: '325px'}} className={externalClasses}>
      <Typography.Text className={styles.title}>{title}</Typography.Text>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.content}>{children}</div>
    </Card>
  )
}

export default PaperLayout;