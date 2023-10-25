"use client";
import { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import Transport from "@ledgerhq/hw-transport";
import Loader from './common/loader';
import Snackbar from './common/snackbar';
import HomePage from './pages/homePage';
import DashboardPage from './pages/dashboardPage';
import {SnackbarContext, SnackbarContextType, SnackbarType} from '../context/snackbarContext';
import './App.css';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [transport, setTransport] = useState<Transport | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarContextType>({
    type: SnackbarType.SUCCESS,
    message: '',
  });
  const value = { snackbar, setSnackbar };

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

  if (loading) return <Loader />;

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
        {!transport ? 
            <HomePage onSelectDevice={onSelectDevice} transport={transport}/> : 
            <DashboardPage transport={transport}/>
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