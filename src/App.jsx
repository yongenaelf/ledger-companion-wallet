import React, { Component } from "react";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import AppAelf from "./AppAelf";
import QRCode from "./QRCode";
import "./App.css";

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

  state = {
    error: null,
    address: null,
    publicKey: null,
    chainCode: null
  };

  async componentDidMount() {
    while (!this.state.address) {
      if (this.unmounted) return;
      await this.fetchAddress(false);
      await delay(500);
    }
    this.fetchAddress(true);
  }

  async componentWillUnmount() {
    this.unmounted = true;
  }

  fetchAddress = async (verify) => {
    const { transport } = this.props;
    try {
      const eth = new AppAelf(transport);
      const path = "44'/1616'/0'/0/0"; // HD derivation path
      const { publicKey, address, chainCode } = await eth.getAddress(path, verify);
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

  render() {
    const { address, publicKey, chainCode, error } = this.state;

    return (
      <div className="ShowAddressScreen">
        {!address ? (
          <>
            <p className="loading">Loading your AElf address...</p>
            {error ? (
              <p className="error">
                A problem occurred, make sure to open the AElf application
                on your Ledger. ({String((error && error.message) || error)})
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
                  <td>{publicKey}</td>
                </tr>
                <tr>
                  <td>Chain Code: </td>
                  <td>{chainCode}</td>
                </tr>
              </tbody>
            </table>
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
