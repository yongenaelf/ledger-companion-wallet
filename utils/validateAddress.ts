import AElf from "aelf-sdk";

const { decodeAddressRep } = AElf.utils;

export const validateAddress = (addr: string) => {
  try {
    decodeAddressRep(addr);
  } catch (err) {
    throw new Error("Oops! Please input a valid AELF network address!");
  }
};
