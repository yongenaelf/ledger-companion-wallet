# Ledger Companion Wallet (AElf version)

This is a Companion Wallet for Ledger.

## Set up

Ensure that [NodeJS](https://nodejs.org/en) is installed.

Clone this repository, and in a terminal, run (replace path-to-the-repo with the actual path):

```bash
cd path-to-the-repo
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run test`

Runs the app in the development mode.\
Open [http://localhost:1234](http://localhost:1234) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm cli`

Run the cli to generate a sample transfer hex.

You may then send this hex to a Ledger device using a tool like [ledgerctl](https://github.com/LedgerHQ/ledgerctl):

```bash
echo '<your transfer hex string>' | ledgerctl send -
```

Or [Speculos](https://speculos.ledger.com/user/clients.html):

```bash
echo '<your transfer hex string>' | LEDGER_PROXY_ADDRESS=127.0.0.1 LEDGER_PROXY_PORT=9999 ledgerctl send -
```

## References

- [Ledger Web USB/HID walkthrough](https://developers.ledger.com/docs/transport/web-hid-usb/)
- [Ledger Web Bluetooth walkthrough](https://developers.ledger.com/docs/transport/web-bluetooth/)
