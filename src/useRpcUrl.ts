import { useContext } from "react";
import { INetworkContext, NetworkContext } from "./App";

const getRpcUrl = (
  network: INetworkContext["network"],
  chain: INetworkContext["chain"]
) => {
  if (network === "mainnet") {
    return `https://${chain}-public-node.aelf.io`;
  } else {
    return `https://${chain}-test-node.aelf.io`;
  }
};

function useRpcUrl() {
  const { network, chain } = useContext(NetworkContext);

  return getRpcUrl(network, chain);
}

export default useRpcUrl;
