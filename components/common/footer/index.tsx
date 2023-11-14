import { Layout } from "antd";
import styles from "./style";

const Footer = () => {
  return (
    <Layout.Footer style={styles.footer}>
      AELF &copy;{(new Date()).getFullYear()}
    </Layout.Footer>
  );
}

export default Footer;