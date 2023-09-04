import compiled from "./src/compiled.js";
const { aelf } = compiled;
import AElf from "aelf-sdk";
import inquirer from "inquirer";
import { splitPath } from "@ledgerhq/hw-app-eth";

const aelfInstance = new AElf(
  new AElf.providers.HttpProvider("https://aelf-test-node.aelf.io")
);

const { getAddressFromRep } = AElf.pbUtils;

const { Transaction, TransferInput } = aelf;

const path = "44'/1616'/0'/0/0"; // HD derivation path

// testing
const aelfAddress = "2dnNRXYRumh18gAbfUnjygLLKQN1j8TTnKB6ryBKcyfdRjk7QX";
const toAddress = "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US";
const tokenContractAddress =
  "JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE"; // testnet

// https://github.com/protobufjs/protobuf.js/#using-proto-files
export const transfer = async (
  from = aelfAddress,
  to = toAddress,
  amount = 4200000000,
  memo = "a test memo"
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
    to: getAddressFromRep(tokenContractAddress),
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

const wrapTransaction = (rawTxHex) => {
  const paths = splitPath(path);
  const pathBuffer = Buffer.alloc(1 + paths.length * 4);
  pathBuffer[0] = paths.length;
  paths.forEach((element, index) => {
    pathBuffer.writeUInt32BE(element, 1 + 4 * index);
  });

  const rawTxBuffer = Buffer.from(rawTxHex, "hex");
  const data = Buffer.concat([
    Buffer.from([1 + pathBuffer.length + rawTxBuffer.length]),
    Buffer.from([1]),
    pathBuffer,
    rawTxBuffer,
  ]);

  const exchangeData = Buffer.concat([
    Buffer.from([0xe0, 0x03, 0x01, 0x00]),
    data,
  ]);

  return exchangeData.toString("hex");
};

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "input",
      name: "from",
      default: "2dnNRXYRumh18gAbfUnjygLLKQN1j8TTnKB6ryBKcyfdRjk7QX",
    },
    {
      type: "input",
      name: "to",
      default: "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
    },
    {
      type: "number",
      name: "amount",
      default: 4200000000,
    },
    {
      type: "input",
      name: "memo",
      default: "a test memo",
    },
  ])
  .then((answers) => {
    const { from, to, amount, memo } = answers;

    transfer(from, to, amount, memo).then((res) => {
      console.info("hex: ", wrapTransaction(res));
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
