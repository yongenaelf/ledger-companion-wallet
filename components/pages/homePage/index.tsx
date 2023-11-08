import { Flex, Layout } from 'antd';
import Transport from "@ledgerhq/hw-transport";
import Header from '../../common/header';
import Footer from '../../common/footer';
import ConnectDevice from "../../connectDevice";
import useStyles from "./style";

interface HomePageProps {
  // eslint-disable-next-line no-unused-vars
  onSelectDevice: (transport: Transport) => void;
}

const HomePage = ({
  onSelectDevice,
}: HomePageProps) => {
  const classes = useStyles;
  const {Content} = Layout;
  return (
    <>  
      <Flex flex={1}>
        <Flex flex={1} justify='flex-start' align='flex-start' vertical>
          <Layout style={classes.layoutContainer}>
            <Header externalClasses={{
              container: classes.stickyHeader,
              header: classes.headerContainer
            }}/>
            <Content style={classes.contentContainer}>
              <ConnectDevice {...{onSelectDevice}}/>
            </Content>
            <Footer/>
          </Layout>
        </Flex>
        <div style={classes.rightContainer}/>
      </Flex>    
    </>
  )
};

export default HomePage;