import { useContext } from "react";
import { INetworkContext, NetworkContext } from "./App";

const getExplorerUrl = (
  network: INetworkContext["network"],
  chain: INetworkContext["chain"]
) => {
  if (network === "mainnet") {
    if (chain === "aelf") return `https://explorer.aelf.io`;

    return `https://${chain}-explorer.aelf.io`;
  } else {
    if (chain === "aelf") return `https://explorer-test.aelf.io`;

    return `https://explorer-test-side02.aelf.io/`;
  }
};

function useExplorerUrl() {
  const { network, chain } = useContext(NetworkContext);

  return getExplorerUrl(network, chain);
}

export default useExplorerUrl;
