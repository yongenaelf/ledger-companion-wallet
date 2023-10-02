import Transport from "@ledgerhq/hw-transport";
import { Component } from "react";
import AppAelf from "../utils/Elf";
import React from "react";
import { Balance } from "./Balance";
import { SendTransaction } from "./SendTransaction";
import { Button, Tabs, Descriptions } from "antd";
import { AllTransactions } from "./AllTransactions";
import AddressVerification from "./AddressVerification";

const delay = (ms: number) => new Promise((success) => setTimeout(success, ms));

export class AddressScreen extends Component<{
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
        <p className="error">
          {String((error as Error)?.message ?? error)}{" "}
          <Button onClick={() => this.fetchAddress()}>Retry</Button>
        </p>
      );

    if (!address) return <p>Loading address...</p>;

    return (
      <div>
        <Balance />
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
                  <Descriptions
                    title="Ledger Live AElf Account 1"
                    items={[
                      {
                        key: "1",
                        label: "Address",
                        children: `ELF_${address}_${chain}`,
                      },
                    ]}
                  />
                  <AddressVerification
                    verifying={this.state.verifying}
                    triggerVerification={() => this.fetchAddress(true)}
                  />
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
      </div>
    );
  }
}
