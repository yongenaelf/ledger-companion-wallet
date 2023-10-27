import bs58 from "bs58";
import {ChainStateEnum, NetworkStateEnum} from "../state";
import {replaceAll} from "../utils/utils";

export const validateAddress = (addr: string, network: NetworkStateEnum) => {
  try {
    if (addr.startsWith("ELF_")) {
      addr = replaceAll(addr, "ELF_", "");
    }
    if (network == NetworkStateEnum.mainnet &&  (addr.endsWith(`_${ChainStateEnum.AELF}`) || addr.endsWith(`_${ChainStateEnum.tDVV}`))) {
      addr = replaceAll(addr, `_${ChainStateEnum.AELF}`, "");
      addr = replaceAll(addr, `_${ChainStateEnum.tDVV}`, "");
    }
    if (network == NetworkStateEnum.testnet &&  (addr.endsWith(`_${ChainStateEnum.AELF}`) || addr.endsWith(`_${ChainStateEnum.tDVW}`))) {
      addr = replaceAll(addr, `_${ChainStateEnum.AELF}`, "");
      addr = replaceAll(addr, `_${ChainStateEnum.tDVW}`, "");
    }
    bs58.decode(addr);
  } catch (err) {
    throw new Error("Oops! Please input a valid AELF network address!");
  }
};