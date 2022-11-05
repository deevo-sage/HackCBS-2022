import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  createTransactionSlice,
  createUserSlice,
  TransactionSlice,
  UserSlice,
} from "./configs";

type AppSlice = UserSlice & TransactionSlice;

export const useStore = create<AppSlice>()(
  subscribeWithSelector(
    immer((...a) => ({
      ...createUserSlice(...a),
    }))
  )
);
