
import {ChainStateEnum, NetworkStateEnum} from "@/state";

type ChainOptions = Array<{ value: ChainStateEnum; label: string }>;
type NetworkOptions = Array<{ value: NetworkStateEnum; label: string }>;

export const MAINNET_SIDECHAIN_OPTIONS: ChainOptions = [
  { value: ChainStateEnum.tDVV, label: 'SideChain '.concat(ChainStateEnum.tDVV) },
];

export const TESTNET_SIDECHAIN_OPTIONS: ChainOptions = [
  { value: ChainStateEnum.tDVW, label: 'SideChain '.concat(ChainStateEnum.tDVW) },
];

export const NETWORK_OPTIONS: NetworkOptions = [
  { value: NetworkStateEnum.mainnet, label: "AELF Mainnet" },
  { value: NetworkStateEnum.testnet, label: "AELF Testnet" },
];