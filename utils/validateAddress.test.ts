import { describe, expect, test } from "vitest";
import { validateAddress } from "./validateAddress";
import {NetworkStateEnum} from "../state";

describe("test validateAddress", () => {
  test.each([
    "elf",
    "ELF",
    "ELF_",
    "_tdvw",
    "_tDVW",
    "tdvw",
    "tDVW",
    "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US_AELF",
    "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US_",
    "_cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
    "ELF_cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
  ])("should throw: %s", (a) => {
    expect(() => validateAddress(a, NetworkStateEnum.mainnet)).toThrowError();
  });

  test.each([
    "",
    "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
    "ELF_cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US_AELF",
  ])("should not throw: %s", (a) => {
    expect(() => validateAddress(a, NetworkStateEnum.mainnet)).not.toThrowError();
  });
});
