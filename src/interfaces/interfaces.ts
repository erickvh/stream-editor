export interface IArgv {
  [x: string]: unknown;
  n: boolean | undefined;
  i: boolean | undefined;
  f: string | undefined;
  e: (string | number)[] | undefined;
  _: string[];
  $0: string;
}
