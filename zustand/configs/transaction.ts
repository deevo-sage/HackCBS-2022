import axios from "axios";
import {
  Chain,
  GetTransactionDocument,
  Status,
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
  ping: (id: string, amount: number) => Promise<boolean>;
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
    ping: async (id: string, amount: number) => {
      const time = 5000;
      let count = 0;
      const from = get().user.data?.address || "",
        to = get().transaction.to;
      const fn = async () => {
        const transaction: TransactionType = {
          chain: "MAT",
          id,
          from,
          to,
          FIAT: amount,
          status:
            count > 4 ? "SUCCESS" : count > 2 ? "CRYPTO_SUCCESS" : "PENDING",
        };
        count++;
        set((state) => {
          state.transaction.data = transaction as TransactionType;
        });
        if (transaction.status === "PENDING") {
          setTimeout(fn, time);
        }
        if (transaction.status === "CRYPTO_SUCCESS") {
          set((state) => {
            state.transaction.data = transaction as TransactionType;
          });
          setTimeout(fn, time);
        }
        if (transaction.status === "SUCCESS") {
          set((state) => {
            state.transaction.data = transaction as TransactionType;
            state.transaction.status = "idle";
          });
        }
      };
      await fn();
      return true;
    },
    start: async (amount: number) => {
      if (!amount || amount <= 0) return;
      set((state) => {
        state.transaction.status = "loading";
      });
      const temp = await get().transaction.ping(
        "0x01aaeqqwe123412312312",
        amount
      );
      return temp;
    },
  },
});

export const createTransactionSliceDump: StoreSlice<
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
      console.log({
        to: get().transaction.to,
        amount,
        from: get().user.data?.address,
      });
      const req = await axios.post<{}, { data: string }>("initiateDebit", {
        from: get().user.data?.address,
        //from: "0xb91CC1FBCA90301807DF4B98f5A04f7Ce62a3806",
        to: get().transaction.to,
        amount,
        currency: "INR",
      });

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
