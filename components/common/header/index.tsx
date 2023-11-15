import clsx from 'clsx';
import Image from 'next/image';
import { useRecoilValue } from "recoil";
import { Layout, Typography, Col, Row } from "antd";
import {
  NetworkStateEnum,
  networkState,
} from "../../../state";
import NetworkSelection from "../../overview/components/NetworkSelection";
import logoTestnetImage from '../../../assets/icon/logo-testnet.svg';
import logoMainnetImage from '../../../assets/icon/logo-mainnet.svg';
import styles from "./style.module.css";

interface HeaderProps {
  showNetwork?: boolean;
  externalClasses?: Partial<{container: string, header: string}>;
}
const Header = ({
  showNetwork,
  externalClasses,
}: HeaderProps) => {
  const network = useRecoilValue(networkState);

  return (
    <div className={clsx(styles.headerContainer, externalClasses.container, network == NetworkStateEnum.testnet ? 'testnetwork-header' : 'mainnetwork-header')}>
      <Layout.Header className={clsx(styles.header, externalClasses.header, network == NetworkStateEnum.testnet ? 'testnetwork-header' : 'mainnetwork-header')}>
        <Row className={styles.headerLayout} align="middle">
          <Col span={12} className={styles.verticalCenter}>
            <Image src={network == NetworkStateEnum.testnet ? logoTestnetImage : logoMainnetImage} alt="Aelf logo" height={36}/>
            <Typography.Text className={[styles.title, 'header-title'].join(' ').trim()}>Ledger Wallet</Typography.Text>
          </Col>
          {showNetwork && <Col span={12}>
            <NetworkSelection />
          </Col>}
        </Row>
      </Layout.Header>
    </div>
  );
}

export default Header;