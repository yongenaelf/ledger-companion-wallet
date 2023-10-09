"use client";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, RecoilRoot } from "recoil";
import { ConfigProvider, Layout } from "antd";
import Transport from "@ledgerhq/hw-transport";
import ConnectDevice from "./connectDevice";
import Transactions from "./transactions";
import { addressState, chainState } from "../state";
import Header from './common/header';
import Footer from './common/footer';
import Loader from './common/loader';
import Snackbar from './common/snackbar';
import {SnackbarContext, SnackbarContextType, SnackbarType} from '../context/snackbarContext';
import './App1.css';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [transport, setTransport] = useState<Transport | null>(null);
  const chain = useRecoilValue(chainState);
  const [address, setAddress] = useRecoilState(addressState);
  const [snackbar, setSnackbar] = useState<SnackbarContextType>({
    type: SnackbarType.SUCCESS,
    message: '',
  });
  const value = { snackbar, setSnackbar };
  const {Content} = Layout;

  const onSelectDevice = (transport: Transport) => {
    // @ts-ignore
    window.ledgerTransport = transport;
    transport.on("disconnect", () => {
      setTransport(null);
    });
    setTransport(transport);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
      <SnackbarContext.Provider value={value}>
        <Snackbar {...value.snackbar}/>
        {loading ? <Loader /> : 
          <Layout className="layout-container">
            <Header/>
            <Content className={['layout-content', !transport && 'layout-content-center'].join(' ').trim()}>
              {!transport ? (
                <ConnectDevice onSelectDevice={onSelectDevice} />
              ) : (
                <Transactions
                  transport={transport}
                  chain={chain}
                  address={address}
                  setAddress={setAddress}
                />
              )}
            </Content>
            <Footer/>
          </Layout>
        }
      </SnackbarContext.Provider>
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