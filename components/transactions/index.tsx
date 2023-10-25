import { Component } from "react";
import { Row, Col } from "antd";
import Transport from "@ledgerhq/hw-transport";
import AppAelf from "../../utils/Elf";
import Overview from "../overview";
import SendTransaction from "./components/SendTransaction";
import AllTransactions from "./components/AllTransactions";
import Loader from '../common/loader';
import Card from '../common/card';

const delay = (ms: number) => new Promise((success) => setTimeout(success, ms));

class Transactions extends Component<{
  transport: Transport;
  chain: string;
  address: string;
  setAddress: (addr: string) => void;
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
      const path = "m/44'/1616'/0'/0/0"; // HD derivation path
      const { publicKey, address } = await aelf.getAddress(path, verify);
      this.props.setAddress(address);
      this.setState({ publicKey, error: null });
    } catch (error) {
      if (verify) {
        // in this case, user has rejected the verification

        this.setState({ error: "Rejected the address verification." });
        return;
      }

      // in this case, user is likely not on AElf app
      console.warn(
        `A problem occurred, make sure to open the AElf application on your Ledger. Failed: ${error.message}`
      );
      this.setState({ error });
      return null;
    } finally {
      this.setState({ verifying: false });
    }
  };

  render() {
    const { error } = this.state;
    const { address, transport, chain } = this.props;

    if (error)
      return (
        <Card 
          title='Connect with Device' 
          content='Please unlock your device.' 
          isError
          buttonLabel='Retry' 
          isCentered
          onClickButton={() => this.fetchAddress()}
        />
      );

    if (!address) return <Loader message="Loading address..."/>;

    return (
      <div className="container">  
        <Row gutter={16}>
          <Col span={12}><Overview chain={chain} address={address} transport={transport}/></Col>
          <Col span={12}><SendTransaction transport={transport} /></Col>
        </Row><br/>
        <AllTransactions key={String(this.state.refresh)} />
      </div>
    );
  }
}

export default Transactions;