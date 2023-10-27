import { ChainStateEnum } from "../state";
import {CHAIN_OPTIONS} from '../components/transactions/constants';

export const middleEllipsis = (text: string, start = 9, end = 9) => {
  return `${text.slice(0, start)}...${text.slice(Number(`-${end}`))}`;
};
  
export const endEllipsis = (text: string, total = 18) => {
  return `${text.slice(0, total)}...`;
};

export const fetchMainAddress = (address: string) => {
  if (address.startsWith("ELF_") || address.endsWith(`_${ChainStateEnum.AELF}`) || address.endsWith(`_${ChainStateEnum.tDVW}`)) {
    address = replaceAll(address, 'ELF_', "");
    address = replaceAll(address, `_${ChainStateEnum.AELF}`, "");
    address = replaceAll(address, `_${ChainStateEnum.tDVW}`, "");
  }
  return address;
};

export const replaceAll = (str: string, find: string, replace: string) => {
  const regex = new RegExp(find, 'g');
  return str.replace(regex, replace);
}

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

