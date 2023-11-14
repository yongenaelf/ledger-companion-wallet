import {CSSProperties} from 'react';
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
import styles from "./style";

interface HeaderProps {
  showNetwork?: boolean;
  externalClasses?: Partial<{container: CSSProperties, header: CSSProperties}>;
}
const Header = ({
  showNetwork,
  externalClasses,
}: HeaderProps) => {
  const network = useRecoilValue(networkState);

  return (
    <div style={{...styles.headerContainer, ...externalClasses.container}} className={[network == NetworkStateEnum.testnet ? 'testnetwork-header' : 'mainnetwork-header'].join(' ').trim()}>
      <Layout.Header style={{...styles.header, ...externalClasses.header}} className={[network == NetworkStateEnum.testnet ? 'testnetwork-header' : 'mainnetwork-header'].join(' ').trim()}>
        <Row style={styles.headerLayout} align="middle">
          <Col span={12} style={styles.verticalCenter}>
            <Image src={network == NetworkStateEnum.testnet ? logoTestnetImage : logoMainnetImage} alt="Aelf logo" height={36}/>
            <Typography.Text style={styles.title} className='header-title'>Ledger Wallet</Typography.Text>
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