import axios from "axios";
import {
  GetTransactionDocument,
  Transaction as TransactionType,
} from "../../graphql/generated-types/graphql-operations";
import { UrqlClient } from "../../integrations/urql";
import { StoreSlice } from "../types";
import { UserSlice } from "./user";
import { URL } from "react-native-url-polyfill";
export interface Transaction extends TransactionType {}
export interface TransactionState {
  data?: Transaction;
  to: string;
  status: "init" | "loading" | "error" | "idle";
}

export interface TransactionActions {
  start: (amount: number) => Promise<boolean | undefined>;
  ping: (id: string) => Promise<boolean>;
  updateTo: (to: string) => void;
}

export interface TransactionSlice {
  transaction: TransactionState & TransactionActions;
}

const client = UrqlClient.getInstance().getClient();

export const createTransactionSlice: StoreSlice<
  TransactionSlice,
  UserSlice & TransactionSlice
> = (set, get) => ({
  transaction: {
    data: undefined,
    to: "",
    status: "idle",
    updateTo: (id) => {
      function convertTo(id: string) {
        const uri = new URL(id);
        return uri.searchParams.get("pa");
      }
      console.log(convertTo(id));
      set((state) => {
        state.transaction.to = convertTo(id) || "";
      });
    },
    ping: async (id: string) => {
      const time = 5000;
      const fn = async () => {
        const req = await client
          .query(GetTransactionDocument, { id })
          .toPromise();
        const transaction = req.data;
        console.log({ transaction });
        set((state) => {
          state.transaction.data = transaction?.transaction as TransactionType;
        });
        if (transaction?.transaction.status === "PENDING") {
          setTimeout(fn, time);
        }
        if (transaction?.transaction.status === "CRYPTO_SUCCESS") {
          set((state) => {
            state.transaction.data = transaction.transaction as TransactionType;
          });
          setTimeout(fn, time);
        }
        if (transaction?.transaction.status === "SUCCESS") {
          set((state) => {
            state.transaction.data = transaction.transaction as TransactionType;
            state.transaction.status = "idle";
          });
        }
      };
      await fn();
      return true;
    },
    start: async (amount: number) => {
      //    return get().transaction.ping("afda18e6-d724-45c5-b342-c73993410a41");
      if (!amount || amount <= 0) return;
      console.log({ to: get().transaction.to, amount });
      const req = await axios.post<{}, { data: string }>("initiateDebit", {
        from: get().user.data?.address,
        //from: "0xb91CC1FBCA90301807DF4B98f5A04f7Ce62a3806",
        to: get().transaction.to,
        amount,
        currency: "INR",
      });
      console.log(req.data);
      if (req.data) {
        set((state) => {
          state.transaction.status = "loading";
        });
        const temp = await get().transaction.ping(req.data);
        return temp;
      }
      return false;
    },
  },
});
