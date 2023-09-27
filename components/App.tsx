"use client";

import React, { useState, createContext } from "react";
import { DeviceSelectionScreen } from "./DeviceSelectionScreen";
import { AddressScreen } from "./AddressScreen";
import Transport from "@ledgerhq/hw-transport";
import { ConfigProvider, Layout } from "antd";
import NetworkSelection from "./NetworkSelection";
const { Content, Header } = Layout;

export interface INetworkContext {
  network: "testnet" | "mainnet";
  chain: "aelf" | "tdvv" | "tdvw";
}

export const NetworkContext = createContext<INetworkContext>({
  network: "testnet",
  chain: "aelf",
});

function App() {
  const [transport, setTransport] = useState<Transport | null>(null);
  const [network, setNetwork] = useState<INetworkContext["network"]>("testnet");
  const [chain, setChain] = useState<INetworkContext["chain"]>("aelf");

  const onSelectDevice = (transport: Transport) => {
    // @ts-ignore
    window.ledgerTransport = transport;
    transport.on("disconnect", () => {
      setTransport(null);
    });
    setTransport(transport);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            controlWidth: 400,
          },
        },
      }}
    >
      <NetworkContext.Provider value={{ network, chain }}>
        <Layout>
          <Header style={{ display: "flex", alignItems: "center" }}>
            <NetworkSelection setChain={setChain} setNetwork={setNetwork} />
          </Header>
          <Content style={{ padding: "20px 50px" }}>
            {!transport ? (
              <DeviceSelectionScreen onSelectDevice={onSelectDevice} />
            ) : (
              <AddressScreen transport={transport} />
            )}
          </Content>
        </Layout>
      </NetworkContext.Provider>
    </ConfigProvider>
  );
}

export default App;
