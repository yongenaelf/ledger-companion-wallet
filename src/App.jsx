import React, { Component } from "react";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import AppAelf from "./AppAelf";
import QRCode from "./QRCode";
import "./App.css";
import { transfer } from "./transaction";
import AElf from "aelf-sdk";
import { did } from "@portkey/did";
import BigNumber from "bignumber.js";

const aelf = new AElf(
  new AElf.providers.HttpProvider(`https://${process.env.BLOCKCHAIN_URL}`)
);
const viewWallet = AElf.wallet.createNewWallet();

const delay = (ms) => new Promise((success) => setTimeout(success, ms));

class DeviceSelectionScreen extends Component {
  //Component that will display all the Ledger Nano X that is recognized by bluetooth

  state = {
    devices: [],
  };

  createUSB = async () => {
    const transport = await TransportWebUSB.create();
    this.props.onSelectDevice(transport);
  };

  render() {
    return (
      <div className="DeviceSelectionScreen">
        <p>
          Power up your Ledger device and enter your pin before continuing...
        </p>
        <button onClick={this.createUSB}>Connect with USB</button>
      </div>
    );
  }
}

class ShowAddressScreen extends Component {
  //Component that is responsible to display your AElf address

  constructor(props) {
    super(props);
    this.signTransaction = this.signTransaction.bind(this);
    this.fetchBalance = this.fetchBalance.bind(this);
  }

  state = {
    error: null,
    address: null,
    publicKey: null,
    chainCode: null,
    to: "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
    amount: 4200000000,
    memo: "a test memo",
    checkDevice: false,
    chainId: "AELF",
    balance: null,
    chainInfo: null,
    multiTokenContract: null,
  };

  async componentDidMount() {
    while (!this.state.address) {
      if (this.unmounted) return;
      await this.fetchAddress();
      await delay(500);
    }

    if (this.state.address) {
      await this.setup();
      if (this.state.multiTokenContract) {
        await this.fetchBalance();
      }
    }
  }

  async componentWillUnmount() {
    this.unmounted = true;
  }

  fetchAddress = async (verify) => {
    const { transport } = this.props;
    try {
      const aelf = new AppAelf(transport);
      const path = "44'/1616'/0'/0/0"; // HD derivation path
      const { publicKey, address, chainCode } = await aelf.getAddress(
        path,
        verify
      );
      if (this.unmounted) return;
      this.setState({ publicKey, address, chainCode });
    } catch (error) {
      // in this case, user is likely not on AElf app
      console.warn("Failed: " + error.message);
      if (this.unmounted) return;
      this.setState({ error });
      return null;
    }
  };

  signTransaction = async (rawTx) => {
    const { transport } = this.props;
    try {
      const aelf = new AppAelf(transport);
      const path = "44'/1616'/0'/0/0"; // HD derivation path
      const res = await aelf.signAElfTransaction(path, rawTx);
      const sig = res.slice(0, -4); // remove "9000"

      const response = await fetch(
        `https://${process.env.BLOCKCHAIN_URL}/api/blockChain/sendRawTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Transaction: rawTx,
            Signature: sig,
            ReturnTransaction: true,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (this.unmounted) return;
    } catch (error) {
      // in this case, user is likely not on AElf app
      console.warn("Failed: " + error.message);
      if (this.unmounted) return;
      this.setState({ error });
      return null;
    }
  };

  setup = async () => {
    const CHAIN_ID = this.state.chainId;
    const chainsInfo = await did.services.getChainsInfo();
    const chainInfo = chainsInfo.find((chain) => chain.chainId === CHAIN_ID);
    const multiTokenContract = await aelf.chain.contractAt(
      chainInfo.defaultToken.address,
      viewWallet
    );

    this.setState({ chainInfo, multiTokenContract });
  };

  fetchBalance = async () => {
    const { multiTokenContract, chainInfo, address } = this.state;
    this.setState({ balance: "Fetching balance..." });

    const result = await multiTokenContract.GetBalance.call({
      symbol: chainInfo.defaultToken.symbol,
      owner: address,
    });

    const balance = new BigNumber(result?.balance)
      .dividedBy(10 ** chainInfo.defaultToken.decimals)
      .toFixed(2);

    this.setState({ balance });
  };

  render() {
    const { address, publicKey, balance, error, checkDevice } = this.state;

    if (checkDevice) {
      return <div>Check your Ledger device to continue...</div>;
    }

    return (
      <div className="ShowAddressScreen">
        {!address ? (
          <>
            <p className="loading">Loading your AElf address...</p>
            {error ? (
              <p className="error">
                A problem occurred, make sure to open the AElf application on
                your Ledger. ({String((error && error.message) || error)})
              </p>
            ) : null}
          </>
        ) : (
          <>
            <strong>Ledger Live AElf Account 1</strong>
            <QRCode data={address} size={300} />
            <table>
              <tbody>
                <tr>
                  <td>Address: </td>
                  <td>{address}</td>
                </tr>
                <tr>
                  <td>Public Key: </td>
                  <td>
                    {publicKey}{" "}
                    <button
                      onClick={async () => {
                        try {
                          await this.fetchAddress(true);
                        } catch (err) {
                          alert("an error occurred, please try again later.");
                          console.error(err);
                          this.setState({
                            publicKey: "-",
                            address: "-",
                            chainCode: "-",
                          });
                        }
                      }}
                    >
                      verify
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Balance: </td>
                  <td>
                    {balance}{" "}
                    <button
                      onClick={async () => {
                        try {
                          await this.fetchBalance();
                        } catch (err) {
                          alert("an error occurred, please try again later.");
                          console.error(err);
                          this.setState({ balance: "-" });
                        }
                      }}
                      disabled={this.state.balance === "Fetching balance..."}
                    >
                      refresh
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>To: </td>
                  <td>
                    <textarea
                      rows={2}
                      value={this.state.to}
                      onChange={(e) => this.setState({ to: e.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Amount: </td>
                  <td>
                    <input
                      value={this.state.amount}
                      onChange={(e) =>
                        this.setState({ amount: Number(e.target.value) })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Memo: </td>
                  <td>
                    <input
                      value={this.state.memo}
                      onChange={(e) => this.setState({ memo: e.target.value })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={async () => {
                this.setState({ checkDevice: true });
                const res = await transfer(
                  address,
                  this.state.to,
                  this.state.amount,
                  this.state.memo
                );

                await this.signTransaction(res);
                this.setState({ checkDevice: false });
              }}
            >
              Transfer
            </button>
            <a
              href={`https://${process.env.EXPLORER_URL}/address/ELF_${address}_AELF#txns`}
              target="_blank"
            >
              View transactions on AElf Explorer
            </a>
          </>
        )}
      </div>
    );
  }
}

class App extends Component {
  state = {
    transport: null,
  };

  onSelectDevice = (transport) => {
    window.ledgerTransport = transport;
    transport.on("disconnect", () => {
      this.setState({ transport: null });
    });
    this.setState({ transport });
  };

  render() {
    const { transport } = this.state;
    return (
      <div className="App">
        {!transport ? (
          <DeviceSelectionScreen onSelectDevice={this.onSelectDevice} />
        ) : (
          <ShowAddressScreen transport={transport} />
        )}
      </div>
    );
  }
}

export default App;
