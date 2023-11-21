import { Layout } from "antd";
import styles from "./style.module.css";

const Footer = () => {
  return (
    <Layout.Footer className={styles.footer}>
      AELF &copy;{(new Date()).getFullYear()}
    </Layout.Footer>
  );
}

export default Footer;