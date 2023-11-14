import { ReactNode, CSSProperties } from 'react';
import { Card, Typography } from "antd";
import styles from "./style";

interface PaperLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: ReactNode;
  externalClasses?: CSSProperties;
}
const PaperLayout = ({
  children,
  title,
  subtitle,
  externalClasses,
}: PaperLayoutProps) => {

  return (
    <Card bodyStyle={styles.widgetLayout} style={{...externalClasses, minHeight: '325px'}}>
      <Typography.Text style={styles.title}>{title}</Typography.Text>
      {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
      <div style={styles.content}>{children}</div>
    </Card>
  )
}

export default PaperLayout;