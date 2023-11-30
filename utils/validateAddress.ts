import bs58 from "bs58";
import AElf from "aelf-sdk";
import {ChainStateEnum} from "../state";

const { decodeAddressRep } = AElf.utils;

export const validateAddress = (
  addr: string,
  chain: ChainStateEnum = ChainStateEnum.AELF
) => {
  if (addr.trim().length === 0) {
    return;
  } else if (addr.split("_").length === 1) {
    addr = `ELF_${addr}_${chain}`;
  } else if (addr.split("_").length !== 3) {
    throw new Error("Oops! Please input a valid AELF network address!");
  } 
  
  const [_, mid, end] = addr.split("_");
  if (end !== chain)
    throw new Error("Cross-chain transfer is currently not supported. We aim to launch this feature soon.");
  try {
    bs58.decode(mid);
    decodeAddressRep(mid);
    if (!/^[a-zA-Z0-9]+$/.test(mid)) {
      throw new Error("Oops! Please input a valid AELF network address!");
    }
  } catch (err) {
    throw new Error("Oops! Please input a valid AELF network address!");
  }
};