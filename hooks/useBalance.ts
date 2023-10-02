import BigNumber from "bignumber.js";
import { useMultiTokenContract } from "./useMultiTokenContract";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { addressState } from "../state";

export function useBalance() {
  const address = useRecoilValue(addressState);
  const { data } = useMultiTokenContract();

  return useSWR(
    [data, address, "balance"],
    async () => {
      if (!address) throw new Error("No address!");
      if (!data) return;

      const result = await data.multiTokenContract.GetBalance.call({
        symbol: "ELF",
        owner: address,
      });

      const balance = new BigNumber(result?.balance)
        .dividedBy(10 ** 8)
        .toFixed(4);

      return balance;
    },
    {
      fallbackData: "-",
      refreshInterval: 2000,
    }
  );
}
