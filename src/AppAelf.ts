import AppEth, { splitPath } from "@ledgerhq/hw-app-eth";

export default class AppAelf extends AppEth {
  constructor(transport) {
    super(transport);
  }

  /**
   * get public key for a given BIP 32 path.
   * @param path a path in BIP 32 format
   * @option boolDisplay optionally enable or not the display
   * @option boolChaincode optionally enable or not the chaincode request
   * @return an object with a publicKey, address and (optionally) chainCode
   * @example
   * aelf.getPublicKey("44'/60'/0'/0/0").then(o => o.publicKey)
   */
  getPublicKey(
    path: string,
    boolDisplay?: boolean,
    boolChaincode?: boolean
  ): Promise<{
    publicKey: string;
    chainCode?: string;
  }> {
    const paths = splitPath(path);
    const buffer = Buffer.alloc(1 + paths.length * 4);
    buffer[0] = paths.length;
    paths.forEach((element, index) => {
      buffer.writeUInt32BE(element, 1 + 4 * index);
    });
    return this.transport
      .send(
        0xe0,
        0x02,
        boolDisplay ? 0x01 : 0x00,
        boolChaincode ? 0x01 : 0x00,
        buffer
      )
      .then((response) => {
        return {
          publicKey: response.slice(0, 65).toString("hex"),
          chainCode: response.slice(-2).toString("hex"),
        };
      });
  }
}
