import { ChainStateEnum } from "@/state";
import {CHAIN_OPTIONS} from './constants';
import { replaceAll } from "@/utils";

export const fetchMainAddress = (address: string) => {
  if (address.startsWith("ELF_") || address.endsWith(`_${ChainStateEnum.AELF}`) || address.endsWith(`_${ChainStateEnum.tDVW}`)) {
    address = replaceAll(address, 'ELF_', "");
    address = replaceAll(address, `_${ChainStateEnum.AELF}`, "");
    address = replaceAll(address, `_${ChainStateEnum.tDVW}`, "");
  }
  return address;
};

export const getChainFromAddress = (address: string) => {
  if (address.endsWith(`_${ChainStateEnum.AELF}`)) {
    return CHAIN_OPTIONS[ChainStateEnum.AELF];
  } else if (address.endsWith(`_${ChainStateEnum.tDVW}`)) {
    return CHAIN_OPTIONS[ChainStateEnum.tDVW];
  } else if (address.endsWith(`_${ChainStateEnum.tDVV}`)) {
    return CHAIN_OPTIONS[ChainStateEnum.tDVV];
  } 
  return "";
}
  
export const getFormattedAddress = (address: string, chain: ChainStateEnum) => {
  if (!address.startsWith("ELF_")) {
    address = "ELF_".concat(address);
  }
  if (!address.endsWith(`_${ChainStateEnum.AELF}`) && !address.endsWith(`_${ChainStateEnum.tDVW}`) && !address.endsWith(`_${ChainStateEnum.tDVV}`)) {
    address = address.concat(`_${chain}`);
  }
  return address;
};