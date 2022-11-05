import { StateCreator } from "zustand";

export type StoreSlice<
  WRITABLE extends object,
  READABLE extends object = WRITABLE
> = StateCreator<
  READABLE,
  [["zustand/subscribeWithSelector", never], ["zustand/immer", never]],
  [],
  WRITABLE
>;
