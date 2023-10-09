import Image from 'next/image';
import { Layout, Typography } from "antd";
import logoImage from '../../../assets/icon/logo.png';
import useStyles from "./style";

function Header() {
  const classes = useStyles;

  return (
    <Layout.Header style={classes.header}>
      <Image src={logoImage} alt="Aelf logo" width={30} />
      <Typography.Text style={classes.title}>Ledger + Companion Wallet</Typography.Text>
    </Layout.Header>
  );
}

export default Header;