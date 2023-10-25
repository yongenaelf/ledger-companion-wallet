import {CSSProperties} from 'react';
import Image from 'next/image';
import { Layout, Typography, Col, Row } from "antd";
import Transport from "@ledgerhq/hw-transport";
import NetworkSelection from "../../overview/components/NetworkSelection";
import logoMainnetLightImage from '../../../assets/icon/logo-mainnet-light.svg';
import useStyles from "./style";

interface HeaderProps {
  transport: Transport;
  externalClasses?: CSSProperties;
}
const Header = ({
  transport,
  externalClasses,
}: HeaderProps) => {
  const classes = useStyles;

  return (
    <div style={{...externalClasses, ...classes.headerContainer}}>
      <Layout.Header style={classes.header}>
      <Row style={classes.headerLayout} align="middle">
        <Col span={12} style={classes.verticalCenter}>
          <Image src={logoMainnetLightImage} alt="Aelf logo" height={36}/>
          <Typography.Text style={classes.title}>Ledger Wallet</Typography.Text>
        </Col>
        {transport && <Col span={12}>
            <NetworkSelection />
        </Col>}
      </Row>
    </Layout.Header>
    </div>
  );
}

export default Header;