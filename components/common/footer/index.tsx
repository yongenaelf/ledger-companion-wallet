import { Layout } from "antd";
import useStyles from "./style";

function Footer() {
  const classes = useStyles;
  return (
    <Layout.Footer style={classes.footer}>
      Aelf Design &copy;{(new Date()).getFullYear()} Created by Aelf
    </Layout.Footer>
  );
}

export default Footer;