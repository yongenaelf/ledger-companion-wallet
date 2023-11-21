
import {ChainStateEnum} from "@/state";

export const CHAIN_OPTIONS: Record<ChainStateEnum, string> = {
  [ChainStateEnum.AELF]: 'MainChain '.concat(ChainStateEnum.AELF),
  [ChainStateEnum.tDVV]: 'SideChain '.concat(ChainStateEnum.tDVV),
  [ChainStateEnum.tDVW]: 'SideChain '.concat(ChainStateEnum.tDVW),
}