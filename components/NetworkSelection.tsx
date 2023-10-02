import React from "react";
import { Select, Space, Tag } from "antd";
import {
  ChainStateEnum,
  NetworkStateEnum,
  chainState,
  networkState,
} from "../state";
import { useRecoilState, useRecoilValue } from "recoil";
import { explorerUrlState } from "../state/selector";

type ChainOptions = Array<{ value: ChainStateEnum; label: string }>;
const MAINNET_SIDECHAIN_OPTIONS: ChainOptions = [
  { value: ChainStateEnum.tDVV, label: ChainStateEnum.tDVV },
];
const TESTNET_SIDECHAIN_OPTIONS: ChainOptions = [
  { value: ChainStateEnum.tDVW, label: ChainStateEnum.tDVW },
];

type NetworkOptions = Array<{ value: NetworkStateEnum; label: string }>;
const NETWORK_OPTIONS: NetworkOptions = [
  { value: NetworkStateEnum.mainnet, label: "Mainnet" },
  { value: NetworkStateEnum.testnet, label: "Testnet" },
];

function NetworkSelection() {
  const [network, setNetwork] = useRecoilState(networkState);
  const [chain, setChain] = useRecoilState(chainState);
  const explorerUrl = useRecoilValue(explorerUrlState);

  return (
    <Space>
      <Select
        options={NETWORK_OPTIONS}
        value={network}
        onChange={(e) => {
          setNetwork(e);
          setChain(ChainStateEnum.AELF);
        }}
      />
      <Select
        options={[{ value: ChainStateEnum.AELF, label: "AELF" }].concat(
          network === NetworkStateEnum.mainnet
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
