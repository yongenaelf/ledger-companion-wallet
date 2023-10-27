import AElf from "aelf-sdk";
import {ChainStateEnum} from "../state";

const { decodeAddressRep } = AElf.utils;

export const validateAddress = (addr: string) => {
  try {
    if (addr.startsWith("ELF_")) {
      addr = replaceAll(addr, "ELF_", "");
    }
    if (addr.endsWith(`_${ChainStateEnum.AELF}`) || addr.endsWith(`_${ChainStateEnum.tDVW}`)) {
      addr = replaceAll(addr, `_${ChainStateEnum.AELF}`, "");
      addr = replaceAll(addr, `_${ChainStateEnum.tDVW}`, "");
    }
    decodeAddressRep(addr);
  } catch (err) {
    throw new Error("Oops! Please input a valid AELF network address!");
  }
};

const replaceAll = (str: string, find: string, replace: string) => {
  const regex = new RegExp(find, 'g');
  return str.replace(regex, replace);
}
