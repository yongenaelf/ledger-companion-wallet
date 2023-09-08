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
   * @return an object with a publicKey, address and (optionally) chainCode
   * @example
   * aelf.getAddress("44'/1616'/0'/0/0").then(o => o.address)
   */
  getAddress(
    path: string,
    boolDisplay?: boolean
  ): Promise<{
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
      .send(0xe0, 0x02, boolDisplay ? 0x01 : 0x00, 0x00, buffer) // https://github.com/blooo-io/LedgerHQ-app-aelf/blob/main/doc/api.md#get-pubkey
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

    return this.transport
      .send(0xe0, 0x03, 0x01, 0x00, data)
      .then((response) => {
        const res = response.toString("hex");

        return res;
      });
  }
}
