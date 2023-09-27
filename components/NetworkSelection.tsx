import React, { useContext } from "react";
import { Select, Space, Tag } from "antd";
import { INetworkContext, NetworkContext } from "./App";
import useRpcUrl from "./useRpcUrl";
import useExplorerUrl from "./useExplorerUrl";

const MAINNET_SIDECHAIN_OPTIONS = [{ value: "tdvv", label: "tDVV" }];
const TESTNET_SIDECHAIN_OPTIONS = [{ value: "tdvw", label: "tDVW" }];

interface INetworkSelectionProps {
  setNetwork: (e: INetworkContext["network"]) => void;
  setChain: (e: INetworkContext["chain"]) => void;
}
function NetworkSelection({ setNetwork, setChain }: INetworkSelectionProps) {
  const { network, chain } = useContext(NetworkContext);

  const rpcUrl = useRpcUrl();
  const explorerUrl = useExplorerUrl();

  return (
    <Space>
      <Select
        options={[
          { value: "mainnet", label: "Mainnet" },
          { value: "testnet", label: "Testnet" },
        ]}
        value={network}
        onChange={(e) => {
          setNetwork(e);
          setChain("aelf");
        }}
      />
      <Select
        options={[{ value: "aelf", label: "AELF" }].concat(
          network === "mainnet"
            ? MAINNET_SIDECHAIN_OPTIONS
            : TESTNET_SIDECHAIN_OPTIONS
        )}
        value={chain}
        onChange={(e) => {
          setChain(e);
        }}
      />
      <Tag color="#2db7f5">
        <a href={explorerUrl} target="_blank">
          {explorerUrl}
        </a>
      </Tag>
    </Space>
  );
}

export default NetworkSelection;
