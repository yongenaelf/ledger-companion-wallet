import bs58 from "bs58";
import AElf from "aelf-sdk";
import {ChainStateEnum, NetworkStateEnum} from "../state";
import {replaceAll} from "../utils/utils";

const { decodeAddressRep } = AElf.utils;

export const validateAddress = (addr: string, network: NetworkStateEnum, chain: ChainStateEnum = ChainStateEnum.AELF) => {
  try {
    if (addr.startsWith("ELF_")) {
      addr = replaceAll(addr, "ELF_", "");
    }
    if (network == NetworkStateEnum.mainnet && chain === ChainStateEnum.AELF && addr.endsWith(`_${ChainStateEnum.AELF}`)) {
      addr = replaceAll(addr, `_${ChainStateEnum.AELF}`, "");
    } else if (network == NetworkStateEnum.mainnet && chain === ChainStateEnum.tDVV &&  addr.endsWith(`_${ChainStateEnum.tDVV}`)) {
      addr = replaceAll(addr, `_${ChainStateEnum.tDVV}`, "");
    }

    if (network == NetworkStateEnum.testnet && chain === ChainStateEnum.AELF && addr.endsWith(`_${ChainStateEnum.AELF}`)) {
      addr = replaceAll(addr, `_${ChainStateEnum.AELF}`, "");
    } else if (network == NetworkStateEnum.testnet && chain === ChainStateEnum.tDVW &&  addr.endsWith(`_${ChainStateEnum.tDVW}`)) {
      addr = replaceAll(addr, `_${ChainStateEnum.tDVW}`, "");
    }
    bs58.decode(addr);
    decodeAddressRep(addr);
  } catch (err) {
    throw new Error("Oops! Please input a valid AELF network address!");
  }
};