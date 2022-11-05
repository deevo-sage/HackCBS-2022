import { StoreSlice } from "../types";
import { LocalStorage } from "../../integrations/local-storage";

export interface User {
  address: string;
  name?: string;
  upi?: string;
}

export interface UserState {
  data?: User | undefined;
  status: "loading" | "error" | "idle";
}

export interface UserActions {
  set: (user: User | undefined) => void;
  onSignin: (address: string) => Promise<void>;
  updateUser: (name: string, upi: string) => Promise<void>;
}

export interface UserSlice {
  user: UserState & UserActions;
}

const initialState: UserState = {
  status: "loading",
  data: undefined,
};

const localStorage = LocalStorage.getInstance();

export const createUserSlice: StoreSlice<UserSlice, UserSlice> = (
  set,
  get
) => ({
  user: {
    ...initialState,
    set: (user) => {
      set((state) => {
        state.user.data = user;
        state.user.status = "idle";
      });
    },

    onSignin: async (address) => {
      return;
    },
    updateUser: async (name, upi) => {
      return;
    },
  },
});
