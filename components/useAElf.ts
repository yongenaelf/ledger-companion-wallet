import AElf from "aelf-sdk";
import useRpcUrl from "./useRpcUrl";
import { useMemo } from "react";

export const useAElf = () => {
  const rpcUrl = useRpcUrl();

  return useMemo(
    () => new AElf(new AElf.providers.HttpProvider(rpcUrl)),
    [rpcUrl]
  );
};
