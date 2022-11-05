import { StoreSlice } from "../types";

export interface VaultData {
  balance: string;
}

export interface VaultState {
  data?: VaultData | undefined;
  status: "loading" | "error" | "idle";
}

export interface VaultActions {
  fetch: () => Promise<void>;
  addMoney: (amount: string) => Promise<void>;
}

export interface VaultSlice {
  vault: VaultState & VaultActions;
}

const initialState: VaultState = {
  data: undefined,
  status: "idle",
};

export const createVaultSlice: StoreSlice<VaultSlice, VaultSlice> = (
  set,
  get
) => ({
  vault: {
    ...initialState,
    fetch: async () => {
      // TODO
      return;
    },
    addMoney: async (amount) => {
      return;
    },
  },
});
