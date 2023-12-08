import AElf from "aelf-sdk";
import { useAElf } from "@/hooks/useAElf";
import { SMART_CONTRACT_ADDRESS_MAINCHAIN } from '@/utils/constants';
import useSWR from "swr";

const viewWallet = AElf.wallet.createNewWallet();

export const useMultiTokenContract = () => {
  const aelf = useAElf();

  return useSWR([aelf, "multiTokenContract"], async () => {
    /* const tokenContractName = "AElf.ContractNames.Token";
    const chainStatus = await aelf.chain.getChainStatus();
    // get genesis contract address
    const GenesisContractAddress = chainStatus.GenesisContractAddress;
    // get genesis contract instance
    const zeroContract = await aelf.chain.contractAt(
      GenesisContractAddress,
      viewWallet
    );
    // Get contract address by the read only method `GetContractAddressByName` of genesis contract
    const tokenContractAddress =
      await zeroContract.GetContractAddressByName.call(
        AElf.utils.sha256(tokenContractName)
      ); */
    const tokenContractAddress = SMART_CONTRACT_ADDRESS_MAINCHAIN;
    const multiTokenContract = await aelf.chain.contractAt(
      tokenContractAddress,
      viewWallet
    );

    return {
      multiTokenContract,
      tokenContractAddress,
    };
  });
};
