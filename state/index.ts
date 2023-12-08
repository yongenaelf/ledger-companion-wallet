import { atom } from "recoil";

// https://recoiljs.org/docs/introduction/getting-started#atom

export const addressState = atom({
  key: "addressState",
  default: "",
});

export enum NetworkStateEnum {
  mainnet = "mainnet",
  testnet = "testnet",
}
export const networkState = atom<NetworkStateEnum>({
  key: "networkState",
  default: NetworkStateEnum.mainnet,
});

export enum ChainStateEnum {
  AELF = "AELF",
  tDVV = "tDVV",
  tDVW = "tDVW",
}
export const chainState = atom<ChainStateEnum>({
  key: "chainState",
  default: ChainStateEnum.AELF,
});

export const unconfirmedTransactionsState = atom<Array<string>>({
  key: "unconfirmedTransactionsState",
  default: [],
});
