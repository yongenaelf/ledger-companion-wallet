import { selector } from "recoil";
import { chainState, networkState } from "@/state";

// https://recoiljs.org/docs/introduction/getting-started#selector
export const explorerUrlState = selector({
  key: "explorerUrlState",
  get: ({ get }) => {
    const network = get(networkState);
    const chain = get(chainState);

    if (network === "mainnet") {
      if (chain === "AELF") return `https://explorer.aelf.io`;

      return `https://${chain}-explorer.aelf.io`;
    } else {
      if (chain === "AELF") return `https://explorer-test.aelf.io`;

      return `https://explorer-test-side02.aelf.io/`;
    }
  },
});

export const rpcUrlState = selector({
  key: "rpcUrlState",
  get: ({ get }) => {
    const network = get(networkState);
    const chain = get(chainState);

    if (network === "mainnet") {
      return `https://${chain}-public-node.aelf.io`;
    } else {
      return `https://${chain}-test-node.aelf.io`;
    }
  },
});
