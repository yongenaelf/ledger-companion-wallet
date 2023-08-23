import AppEth, { splitPath } from "@ledgerhq/hw-app-eth";
import elliptic from "elliptic";
import AElf from "aelf-sdk";

const ellipticEc = new elliptic.ec("secp256k1");

export default class AppAelf extends AppEth {
  constructor(transport) {
    super(transport);
  }

  /**
   * get address for a given BIP 32 path.
   * @param path a path in BIP 32 format
   * @option boolDisplay optionally enable or not the display
   * @option boolChaincode optionally enable or not the chaincode request
   * @return an object with a publicKey, address and (optionally) chainCode
   * @example
   * aelf.getAddress("44'/1616'/0'/0/0").then(o => o.address)
   */
  getAddress(path: string): Promise<{
    publicKey: string;
    address: string;
    chainCode?: string;
  }> {
    const paths = splitPath(path);
    const buffer = Buffer.alloc(1 + paths.length * 4);
    buffer[0] = paths.length;
    paths.forEach((element, index) => {
      buffer.writeUInt32BE(element, 1 + 4 * index);
    });

    return this.transport
      .send(0xe0, 0x02, 0x00, 0x00, buffer) // https://github.com/blooo-io/LedgerHQ-app-aelf/blob/main/doc/api.md#get-pubkey
      .then((response) => {
        const publicKey = response.slice(0, 65).toString("hex");
        const address = AElf.wallet.getAddressFromPubKey(
          ellipticEc.keyFromPublic(publicKey, "hex").getPublic()
        );
        const chainCode = response.slice(-2).toString("hex");

        return {
          publicKey,
          address,
          chainCode,
        };
      });
  }

  async signAElfTransaction(path: string, rawTxHex: string) {
    const paths = splitPath(path);
    const buffer = Buffer.alloc(1 + paths.length * 4);
    buffer[0] = paths.length;
    paths.forEach((element, index) => {
      buffer.writeUInt32BE(element, 1 + 4 * index);
    });

    const data = Buffer.from(
      ["b101", buffer.toString("hex"), rawTxHex].join(""),
      "hex"
    );

    const exchangeData = Buffer.concat([
      Buffer.from([0xe0, 0x03, 0x01, 0x00]),
      data,
    ]);

    console.log(
      exchangeData.toString("hex"),
      "== data sent to ledger wallet device"
    );

    return this.transport.exchange(exchangeData).then((response) => {
      const res = response.toString("hex");

      console.log(res, "== data returned from ledger wallet device");

      return res;
    });
  }
}
