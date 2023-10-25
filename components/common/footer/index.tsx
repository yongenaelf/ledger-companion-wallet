import { Layout } from "antd";
import useStyles from "./style";

const Footer = () => {
  const classes = useStyles;
  return (
    <Layout.Footer style={classes.footer}>
      AELF &copy;{(new Date()).getFullYear()}
    </Layout.Footer>
  );
}

export default Footer;