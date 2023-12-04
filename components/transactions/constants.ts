import { differenceInMilliseconds } from "date-fns";
import {ChainStateEnum} from "@/state";

export const CHAIN_OPTIONS: Record<ChainStateEnum, string> = {
  [ChainStateEnum.AELF]: 'MainChain '.concat(ChainStateEnum.AELF),
  [ChainStateEnum.tDVV]: 'SideChain '.concat(ChainStateEnum.tDVV),
  [ChainStateEnum.tDVW]: 'SideChain '.concat(ChainStateEnum.tDVW),
}

export const getLastTwoUnits = (date) => {
  const now = new Date();
  const distance = differenceInMilliseconds(now, date);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours} hr${hours > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  }
}