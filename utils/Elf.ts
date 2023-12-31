/********************************************************************************
 *   Ledger Node JS API
 *   (c) 2016-2017 Ledger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/

// FIXME drop:
import type Transport from "@ledgerhq/hw-transport";
import { pathStringToArray } from "./pathStringToArray";
import elliptic from "elliptic";
import { Logger } from "./Logger";

export const ellipticEc = new elliptic.ec("secp256k1");

/**
 * AElf API
 *
 * @example
 * import Elf from "@ledgerhq/hw-app-elf";
 * const elf = new Elf(transport)
 */
export default class Elf {
  transport: Transport;

  constructor(transport: Transport, scrambleKey = "ELF") {
    this.transport = transport;
    this.transport.decorateAppAPIMethods(
      this,
      ["getAddress", "signTransaction", "getAppConfiguration"],
      scrambleKey
    );
  }

  /**
   * get AElf address for a given BIP 32 path.
   * @param path a path in BIP 32 format
   * @option boolDisplay optionally enable or not the display
   * @return an object with a publicKey, address and (optionally) chainCode
   * @example
   * elf.getAddress("m/44'/1616'/0'/0/0").then(o => o.address)
   */
  getAddress(
    path: string,
    boolDisplay?: boolean
  ): Promise<{
    publicKey: string;
    address: string;
  }> {
    const paths = pathStringToArray(path);
    const buffer = Buffer.alloc(1 + paths.length * 4);
    buffer[0] = paths.length;
    paths.forEach((element, index) => {
      buffer.writeUInt32BE(element, 1 + 4 * index);
    });

    return this.transport
      .send(0xe0, 0x02, boolDisplay ? 0x01 : 0x00, 0x00, buffer)
      .then((response) => {
        Logger.logSend(
          "getAddress",
          0xe0,
          0x02,
          boolDisplay ? 0x01 : 0x00,
          0x00,
          buffer,
          response
        );

        const publicKeyLength = response[0];
        const addressLength = response[1 + publicKeyLength];

        return {
          publicKey: response.slice(1, 1 + publicKeyLength).toString("hex"),
          address: response
            .slice(
              1 + publicKeyLength + 1,
              1 + publicKeyLength + 1 + addressLength
            )
            .toString("ascii"),
        };
      });
  }

  /**
   * You can sign a transaction and retrieve signature and chain code given the raw transaction and the BIP 32 path of the account to sign.
   *
   * @param path: the BIP32 path to sign the transaction on
   * @param rawTxHex: the raw aelf transaction in hexadecimal to sign
   * @example
   const result = elf.signTransaction("m/44'/1616'/0'/0/0", tx);
   console.log(result);
   */
  async signTransaction(
    path: string,
    rawTxHex: string
  ): Promise<{
    signature: string;
    errorCode: string;
  }> {
    const paths = pathStringToArray(path);
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

    return this.transport.exchange(exchangeData).then((response) => {
      Logger.logExchange("signTransaction", exchangeData, response);

      const res = response.toString("hex");

      const signature = res.slice(0, -4);
      const errorCode = res.slice(-4);

      return {
        signature,
        errorCode,
      };
    });
  }

  /**
   */
  getAppConfiguration(): Promise<{
    version: string;
  }> {
    return this.transport.send(0xe0, 0x01, 0x00, 0x00).then((response) => {
      Logger.logSend(
        "getAppConfiguration",
        0xe0,
        0x01,
        0x00,
        0x00,
        undefined,
        response
      );

      return {
        version: "" + response[2] + "." + response[3] + "." + response[4],
      };
    });
  }
}
