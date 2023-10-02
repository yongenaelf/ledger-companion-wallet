import AElf from "aelf-sdk";

const { decodeAddressRep } = AElf.utils;

export const validateAddress = (addr: string) => {
  try {
    decodeAddressRep(addr);
  } catch (err) {
    throw new Error("Invalid address.");
  }
};
