import bippath from "bip32-path";

export function pathStringToArray(path: string): number[] {
  return bippath.fromString(path).toPathArray();
}

export const middleEllipsis = (text: string, start = 7, end = 7) => {
  return `${text.slice(0, start)}...${text.slice(Number(`-${end}`))}`;
};
