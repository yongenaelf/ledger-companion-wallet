import compiled from "./src/compiled.js";
const { aelf } = compiled;
import inquirer from "inquirer";

const { Transaction, Address } = aelf;

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "input",
      name: "input",
      default:
        "0a220a20cdefe728493133f526cb5e97e2ec339ca219bef80427eaf53ff0003cad241c7a12220a202791e992a57f28e75a11f13af2c0aec8b0eb35d2f048d42eba8901c92e0378dc188dcda24b22045a7447382a085472616e7366657232340a220a204ff4e63ad4aa7ec92e65ba2d37b2c56b3f82390bfc25e66cebab6821f3b05c0b1203454c461880ade204220474657374",
    },
  ])
  .then((answers) => {
    const { input } = answers;

    const message = Buffer.from(input, "hex");

    var tx = Transaction.decode(message);

    var obj = Transaction.toObject(tx);

    console.log({
      ...obj,
      from: obj.from.value.toString("hex"),
      to: obj.to.value.toString("hex"),
      refBlockNumber: obj.refBlockNumber,
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
