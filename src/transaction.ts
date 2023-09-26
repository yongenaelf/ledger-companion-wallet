import { aelf } from "./compiled";
import AElf from "aelf-sdk";

const { getAddressFromRep } = AElf.pbUtils;

const { Transaction, TransferInput } = aelf;

// testing
const aelfAddress = "2dnNRXYRumh18gAbfUnjygLLKQN1j8TTnKB6ryBKcyfdRjk7QX";
const toAddress = "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US";

// https://github.com/protobufjs/protobuf.js/#using-proto-files
export const transfer = async (
  from: string = aelfAddress,
  to: string = toAddress,
  amount = 4200000000,
  memo = "a test memo",
  contractAddress: string = "",
  aelfInstance: any
) => {
  const height = await aelfInstance.chain.getBlockHeight();
  const block = await aelfInstance.chain.getBlockByHeight(height, false);
  const blockHashInput = block.BlockHash;

  const blockHash = blockHashInput.match(/^0x/)
    ? blockHashInput.substring(2)
    : blockHashInput;
  const refBlockPrefix = Buffer.from(blockHash, "hex").slice(0, 4);

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
