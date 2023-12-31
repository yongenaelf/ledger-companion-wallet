import clsx from 'clsx';
import {useState} from 'react';
import { Layout } from 'antd';
import { useRecoilState, useRecoilValue } from "recoil";
import Transport from "@ledgerhq/hw-transport";
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { addressState, chainState } from "@/state";
import Transactions from "@/components/transactions";
import styles from "./style.module.css";

interface DashboardPageProps {
  transport: Transport;
}

const DashboardPage = ({
  transport,
}: DashboardPageProps) => {
  const [isDeviceLocked, setDeviceLocked] = useState(false);
  const [address, setAddress] = useRecoilState(addressState);
  const chain = useRecoilValue(chainState);
  const {Content} = Layout;
  return (
    <Layout className={styles.layoutContainer}>
      {!isDeviceLocked && <Header showNetwork={Boolean(transport)} externalClasses={{container: styles.stickyHeader}}/>}
      <Content className={clsx(styles.layoutContent, isDeviceLocked && styles.p0)}>
        <Transactions
          transport={transport}
          chain={chain}
          address={address}
          setAddress={setAddress}
          setDeviceLocked={setDeviceLocked}
        />
      </Content>
      <Footer/>
    </Layout>
  )
};

export default DashboardPage