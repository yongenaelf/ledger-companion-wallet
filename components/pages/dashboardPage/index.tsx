import { Layout } from 'antd';
import { useRecoilState, useRecoilValue } from "recoil";
import Transport from "@ledgerhq/hw-transport";
import Header from '../../common/header';
import Footer from '../../common/footer';
import { addressState, chainState } from "../../../state";
import Transactions from "../../transactions";
import useStyles from "./style";

interface DashboardPageProps {
    transport: Transport;
}

const DashboardPage = ({
    transport,
}: DashboardPageProps) => {
    const classes = useStyles;
    const [address, setAddress] = useRecoilState(addressState);
    const chain = useRecoilValue(chainState);
    const {Content} = Layout;
    return (
        <Layout className="layout-container">
            <Header transport={transport} externalClasses={classes.stickyHeader}/>
            <Content className={['layout-content'].join(' ').trim()}>
                <Transactions
                    transport={transport}
                    chain={chain}
                    address={address}
                    setAddress={setAddress}
                />
            </Content>
            <Footer/>
        </Layout>
    )
};

export default DashboardPage