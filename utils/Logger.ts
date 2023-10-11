/**
 * Class to manage logging. Add more logic later if necessary.
 */
export class Logger {
  static logSend(
    method: string,
    cla: number,
    ins: number,
    p1: number,
    p2: number,
    data: Buffer = Buffer.alloc(0),
    response: Buffer
  ) {
    const dataIn = Buffer.concat([
      Buffer.from([cla, ins, p1, p2]),
      Buffer.from([data.length]),
      data,
    ]).toString("hex");
    const dataOut = response.toString("hex");

    console.log(`
${method}: 
>> ${dataIn}
<< ${dataOut}`);
  }

  static logExchange(
    method: string,
    data: Buffer = Buffer.alloc(0),
    response: Buffer
  ) {
    const dataIn = data.toString("hex");
    const dataOut = response.toString("hex");

    console.log(`
${method}: 
>> ${dataIn}
<< ${dataOut}`);
  }
}
