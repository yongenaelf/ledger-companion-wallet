import { Flex, Layout } from 'antd';
import Transport from "@ledgerhq/hw-transport";
import Header from '../../common/header';
import Footer from '../../common/footer';
import ConnectDevice from "../../connectDevice";
import styles from "./style.module.css";

interface HomePageProps {
  // eslint-disable-next-line no-unused-vars
  onSelectDevice: (transport: Transport) => void;
}

const HomePage = ({
  onSelectDevice,
}: HomePageProps) => {
  const {Content} = Layout;
  return (
    <Flex flex={1}>
      <Flex flex={1} justify='flex-start' align='flex-start' vertical>
        <Layout className={styles.layoutContainer}>
          <Header externalClasses={{
            container: styles.stickyHeader,
            header: styles.headerContainer
          }}/>
          <Content className={styles.contentContainer}>
            <ConnectDevice {...{onSelectDevice}}/>
          </Content>
          <Footer/>
        </Layout>
      </Flex>
      <div className={styles.rightContainer}/>
    </Flex>
  )
};

export default HomePage;