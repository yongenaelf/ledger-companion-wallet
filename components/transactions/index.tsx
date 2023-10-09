import { Component } from "react";
import Image from 'next/image';
import { Button, Tabs, Descriptions, Card, Typography } from "antd";
import Transport from "@ledgerhq/hw-transport";
import logoImage from '../../assets/icon/logo.png';
import AppAelf from "../../utils/Elf";
import Balance from "../balance";
import SendTransaction from "./components/SendTransaction";
import AllTransactions from "./components/AllTransactions";
import AddressVerification from "./components/AddressVerification";
import Loader from '../common/loader';
import useStyles from "../connectDevice/style";

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
    const cardClasses = useStyles;

    if (error)
      return (
        <Card style={{...cardClasses.card, ...cardClasses.cardCenter}}>
          <Image src={logoImage} alt="Aelf logo" width={60} />
          <Typography.Title style={cardClasses.cardTitle}>Connect with USB</Typography.Title>
          <Typography.Text style={cardClasses.cardContent}>{String((error as Error)?.message ?? error)}{" "}</Typography.Text>
          <Button onClick={() => this.fetchAddress()} block>Retry</Button>
        </Card>
      );

    if (!address) return <Loader message="Loading address..."/>;

    return (
      <>  
        <Balance /><br/>
        <Card>
          <Tabs
            defaultActiveKey="info"
            onChange={(e) => {
              if (e === "info") {
                this.setState({ refresh: !this.state.refresh });
              }
            }}
            items={[
              {
                key: "info",
                label: "Info",
                children: (
                  <>
                    <Descriptions title="Ledger Live AElf Account 1" layout="vertical" >
                      <Descriptions.Item 
                        key={1} 
                        label="Address"
                        style={{ paddingBottom: 0 }}
                        >
                          ELF_${address}_${chain}
                          <AddressVerification
                            verifying={this.state.verifying}
                            triggerVerification={() => this.fetchAddress(true)}
                          />
                      </Descriptions.Item>
                    </Descriptions>
                    <AllTransactions key={String(this.state.refresh)} />
                  </>
                ),
              },
              {
                key: "transfer",
                label: "Transfer",
                children: <SendTransaction transport={transport} />,
              },
            ]}
          />
        </Card>
      </>
    );
  }
}

export default Transactions;