import AElf from "aelf-sdk";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { rpcUrlState } from "../state/selector";

export const useAElf = () => {
  const rpcUrl = useRecoilValue(rpcUrlState);

  return useMemo(
    () => new AElf(new AElf.providers.HttpProvider(rpcUrl)),
    [rpcUrl]
  );
};
