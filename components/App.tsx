"use client";

import React, { useState } from "react";
import { DeviceSelectionScreen } from "./DeviceSelectionScreen";
import { AddressScreen } from "./AddressScreen";
import Transport from "@ledgerhq/hw-transport";
import { ConfigProvider, Layout } from "antd";
import NetworkSelection from "./NetworkSelection";
import { useRecoilState, useRecoilValue, RecoilRoot } from "recoil";
import { addressState, chainState } from "../state";
const { Content, Header } = Layout;

function App() {
  const [transport, setTransport] = useState<Transport | null>(null);
  const chain = useRecoilValue(chainState);
  const [address, setAddress] = useRecoilState(addressState);

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
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <NetworkSelection />
        </Header>
        <Content style={{ padding: "20px 50px" }}>
          {!transport ? (
            <DeviceSelectionScreen onSelectDevice={onSelectDevice} />
          ) : (
            <AddressScreen
              transport={transport}
              chain={chain}
              address={address}
              setAddress={setAddress}
            />
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

const WithRecoil = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

export default WithRecoil;
