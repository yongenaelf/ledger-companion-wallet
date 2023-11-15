import { describe, expect, test } from "vitest";
import { validateAddress } from "./validateAddress";
import {ChainStateEnum} from "../state";

describe("test validateAddress", () => {
  test.each([
    "elf",
    "ELF",
    "_tdvw",
    "_tDVW",
    "tdvw",
    "tDVW",
    "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US_",
    "_cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
  ])("should throw: %s", (a) => {
    expect(() => validateAddress(a, ChainStateEnum.AELF)).toThrowError();
  });

  test.each([
    "",
    "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
    "ELF_cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US_AELF",
  ])("should not throw: %s", (a) => {
    expect(() => validateAddress(a, ChainStateEnum.AELF)).not.toThrowError();
  });
});
