import Transport from "@ledgerhq/hw-transport";
import { Component } from "react";
import AppAelf from "./Elf";
import React from "react";
import { Balance } from "./Balance";
import { SendTransaction } from "./SendTransaction";
import { Button, Modal, Tabs, Row, Col, Descriptions, Statistic } from "antd";
import { AllTransactions } from "./AllTransactions";

const delay = (ms: number) => new Promise((success) => setTimeout(success, ms));

export class AddressScreen extends Component<{ transport: Transport }> {
  unmounted: boolean;

  state = {
    error: null,
    address: null,
    publicKey: "",
    verifying: false,
  };

  async componentDidMount() {
    while (!this.state.address) {
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
    try {
      const aelf = new AppAelf(transport);
      const path = "m/44'/1616'/0'/0/0"; // HD derivation path
      const { publicKey, address } = await aelf.getAddress(path, verify);
      this.setState({ publicKey, address, error: null });
    } catch (error) {
      // in this case, user is likely not on AElf app
      console.warn("Failed: " + error.message);
      this.setState({ error });
      return null;
    } finally {
      this.setState({ verifying: false });
    }
  };

  render() {
    const { error, address, publicKey, verifying } = this.state;

    if (error)
      return (
        <p className="error">
          A problem occurred, make sure to open the AElf application on your
          Ledger. ({String((error as Error)?.message ?? error)}){" "}
          <Button onClick={() => this.fetchAddress()}>Retry</Button>
        </p>
      );

    if (!address) return <p>Loading address...</p>;

    return (
      <div>
        <Row gutter={16}>
          <Col span={3}>
            <Balance address={address} />
          </Col>
          <Col span={21}>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Info",
                  children: (
                    <Descriptions
                      title="Ledger Live AElf Account 1"
                      items={[
                        {
                          key: "1",
                          label: "Address",
                          children: address,
                        },
                        {
                          key: "2",
                          label: "Public Key",
                          children: (
                            <div>
                              {publicKey}
                              <br />
                              <Button
                                disabled={verifying}
                                onClick={() => {
                                  this.setState({ verifying: true });
                                  this.fetchAddress(true);
                                }}
                              >
                                verify{" "}
                                {verifying && `(Please check your device)`}
                              </Button>
                            </div>
                          ),
                        },
                      ]}
                    />
                  ),
                },
                {
                  key: "2",
                  label: "Transfer",
                  children: (
                    <SendTransaction
                      address={address}
                      transport={this.props.transport}
                    />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <AllTransactions address={address} />
        <Modal
          title="Verifying..."
          open={verifying}
          closable={false}
          footer={null}
        >
          <p>Please check device and verify your public key.</p>
          <Statistic title="Public Key (1/8)" value={publicKey.slice(0, 17)} />
          <Statistic title="Public Key (2/8)" value={publicKey.slice(17, 34)} />
          <Statistic title="Public Key (3/8)" value={publicKey.slice(34, 51)} />
          <Statistic title="Public Key (4/8)" value={publicKey.slice(51, 69)} />
          <Statistic title="Public Key (5/8)" value={publicKey.slice(69, 86)} />
          <Statistic
            title="Public Key (6/8)"
            value={publicKey.slice(86, 104)}
          />
          <Statistic
            title="Public Key (7/8)"
            value={publicKey.slice(104, 120)}
          />
          <Statistic title="Public Key (8/8)" value={publicKey.slice(120)} />
        </Modal>
      </div>
    );
  }
}
