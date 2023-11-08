import { ReactNode, CSSProperties } from 'react';
import { Card, Typography } from "antd";
import useStyles from "./style";

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
  const classes = useStyles;

  return (
    <Card bodyStyle={classes.widgetLayout} style={{...externalClasses, minHeight: '325px'}}>
      <Typography.Text style={classes.title}>{title}</Typography.Text>
      {subtitle && <div style={classes.subtitle}>{subtitle}</div>}
      <div style={classes.content}>{children}</div>
    </Card>
  )
}

export default PaperLayout;