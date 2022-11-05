import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  createTransactionSlice,
  createUserSlice,
  createVaultSlice,
  TransactionSlice,
  UserSlice,
  VaultSlice,
} from "./configs";

type AppSlice = UserSlice & TransactionSlice & VaultSlice;

export const useStore = create<AppSlice>()(
  subscribeWithSelector(
    immer((...a) => ({
      ...createUserSlice(...a),
      ...createVaultSlice(...a),
      ...createTransactionSlice(...a),
    }))
  )
);
