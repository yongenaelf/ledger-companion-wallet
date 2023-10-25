import { Flex, Layout } from 'antd';
import Transport from "@ledgerhq/hw-transport";
import Header from '../../common/header';
import Footer from '../../common/footer';
import ConnectDevice from "../../connectDevice";
import useStyles from "./style";

interface HomePageProps {
    transport: Transport;
    onSelectDevice: (transport: Transport) => void;
}

const HomePage = ({
    onSelectDevice,
    transport,
}: HomePageProps) => {
    const classes = useStyles;
    const {Content} = Layout;
    return (
        <>
            
            <Flex flex={1}>
                <Flex flex={1} justify='flex-start' align='flex-start' vertical>
                    <Layout style={classes.layoutContainer}>
                        <Header transport={transport} externalClasses={classes.stickyHeader}/>
                        <Content style={classes.contentContainer}>
                            <div style={{width: '680px'}}><ConnectDevice onSelectDevice={onSelectDevice} /></div>
                        </Content>
                        <Footer/>
                    </Layout>
                </Flex>
                <div style={classes.rightContainer}/>
            </Flex>
            
        </>
    )
};

export default HomePage