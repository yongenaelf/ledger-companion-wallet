import { Dispatch, SetStateAction } from "react";
import { Component } from "react";
import { Row, Col } from "antd";
import Transport from "@ledgerhq/hw-transport";
import AppAelf from "../../utils/Elf";
import Overview from "../overview";
import SendTransaction from "./components/SendTransaction";
import AllTransactions from "./components/AllTransactions";
import Loader from '../common/loader';
import ErrorPage from '../pages/errorPage';
import {HD_DERIVATION_PATH, ERROR_CODE} from '../../utils/constants';
import Card from '../common/card';

const delay = (ms: number) => new Promise((success) => setTimeout(success, ms));

class Transactions extends Component<{
  transport: Transport;
  chain: string;
  address: string;
  // eslint-disable-next-line no-unused-vars
  setAddress: (addr: string) => void;
  setDeviceLocked: Dispatch<SetStateAction<boolean>>;
}> {
  unmounted: boolean;

  state = {
    error: null,
    publicKey: "",
    verifying: false,
    refresh: false,
  };

  async componentDidMount() {
    while (!this.props.address) {
      if (this.unmounted) return;
      await this.fetchAddress();
      await delay(500);
    }
  }

  async componentWillUnmount() {
    this.unmounted = true;
  }

  fetchAddress = async (verify = false) => {
    const { transport } = this.props;
    this.setState({ verifying: !!verify });
    try {
      const aelf = new AppAelf(transport);
      const path = HD_DERIVATION_PATH; // HD derivation path
      const { publicKey, address } = await aelf.getAddress(path, verify);
      this.props.setAddress(address);
      this.setState({ publicKey, error: null });
    } catch (error) {
      this.setState({ error });
      return null;
    } finally {
      this.setState({ verifying: false });
    }
  };

  render() {
    const { error } = this.state;
    const { address, transport, chain } = this.props;

    if (error) {
      this.props.setDeviceLocked(true);
      return (
        <ErrorPage><Card 
          title='Connect with Device' 
          content='Please unlock your device.' 
          isError
          buttonLabel='Retry' 
          onClickButton={() => this.fetchAddress()}
        /></ErrorPage>)
    } else {
      this.props.setDeviceLocked(false);
    }
    

    if (!address) return <Loader message="Loading address..."/>;

    return (
      <div className="container">  
        <Row gutter={16}>
          <Col span={12}><Overview setError={() => this.setState({ error: ERROR_CODE.DEVICE_LOCKED })} chain={chain} address={address} transport={transport}/></Col>
          <Col span={12}><SendTransaction setError={() => this.setState({ error: ERROR_CODE.DEVICE_LOCKED })}  transport={transport} /></Col>
        </Row><br/>
        <AllTransactions key={String(this.state.refresh)} />
      </div>
    );
  }
}

export default Transactions;