import bs58 from "bs58";
import AElf from "aelf-sdk";
import {ChainStateEnum, NetworkStateEnum} from "@/state";
import {replaceAll} from "@/utils";
import {ERROR_CODE} from "@/constants";

const { decodeAddressRep } = AElf.utils;

export const validateAddress = (addr: string, network: NetworkStateEnum, chain: ChainStateEnum = ChainStateEnum.AELF) => {
  try {
    addr = replaceAll(addr, "ELF_", "");

    const chains = {
      [NetworkStateEnum.mainnet]: {
        [ChainStateEnum.AELF]: [ChainStateEnum.tDVV],
        [ChainStateEnum.tDVV]: [ChainStateEnum.AELF],
      },
      [NetworkStateEnum.testnet]: {
        [ChainStateEnum.AELF]: [ChainStateEnum.tDVW],
        [ChainStateEnum.tDVW]: [ChainStateEnum.AELF],
      },
    };
    const otherChains = chains?.[network]?.[chain];

    if (otherChains) {
      if (addr.endsWith(`_${chain}`)) {
        addr = replaceAll(addr, `_${chain}`, "");
      } else if (addr.endsWith(`_${otherChains}`)) {
        throw new Error(ERROR_CODE.CROSS_CHAIN);
      }
    }
    bs58.decode(addr);
    decodeAddressRep(addr);
  } catch (err) {
    if (err.message == ERROR_CODE.CROSS_CHAIN) {
      throw new Error("Cross-chain transfer is currently not supported. We aim to launch this feature soon.");
    } else {
      throw new Error("Oops! Please input a valid AELF network address!");

    }
  }
};