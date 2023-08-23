import { did } from "@portkey/did";
import { aelf } from "./compiled";
import AElf from "aelf-sdk";

const aelfInstance = new AElf(
  new AElf.providers.HttpProvider("https://aelf-test-node.aelf.io")
);

const { getAddressFromRep } = AElf.pbUtils;

const CHAIN_ID = "AELF";
const rpcUrl = "https://aelf-test-node.aelf.io";

did.setConfig({ connectUrl: rpcUrl });

const { Transaction, TransferInput } = aelf;

// testing
const aelfAddress = "2dnNRXYRumh18gAbfUnjygLLKQN1j8TTnKB6ryBKcyfdRjk7QX";
const toAddress = "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US";

// https://github.com/protobufjs/protobuf.js/#using-proto-files
export const transfer = async (
  from: string = aelfAddress,
  to: string = toAddress,
  amount = 4200000000,
  memo = "a test memo"
) => {
  const chainsInfo = await did.services.getChainsInfo();
  const chainInfo = chainsInfo.find((chain) => chain.chainId === CHAIN_ID);
  const height = await aelfInstance.chain.getBlockHeight();
  const block = await aelfInstance.chain.getBlockByHeight(height, false);
  const blockHashInput = block.BlockHash;

  const blockHash = blockHashInput.match(/^0x/)
    ? blockHashInput.substring(2)
    : blockHashInput;
  const refBlockPrefix = Buffer.from(blockHash, "hex").slice(0, 4);

  const contractAddress = chainInfo!.defaultToken.address;

  // Create a new message
  var message = Transaction.fromObject({
    from: getAddressFromRep(from),
    to: getAddressFromRep(contractAddress),
    refBlockNumber: height,
    refBlockPrefix: refBlockPrefix,
    methodName: "Transfer",
    params: TransferInput.encode(
      TransferInput.fromObject({
        to: getAddressFromRep(to),
        symbol: "ELF",
        amount,
        memo,
      })
    ).finish(),
  });
  var buffer = Transaction.encode(message).finish();

  return Buffer.from(buffer).toString("hex");
};
