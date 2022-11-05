import { StoreSlice } from "../types";
import { LocalStorage } from "../../integrations/local-storage";
import axios from "axios";

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
      set((state) => {
        state.user.data = { address };
        state.user.status = "loading";
      });

      const user = await axios.get<User>("user/" + address);
      if (user.status === 404) {
        const newUser = await axios.post<User>("user/create", {
          address,
        });
        set((state) => {
          state.user.data = newUser.data;
          state.user.status = "idle";
        });
        return;
      }
      set((state) => {
        state.user.data = user.data;
        state.user.status = "idle";
      });
    },
    updateUser: async (name, vpa) => {
      set((state) => {
        state.user.status = "loading";
      });

      const user = get().user.data;

      await axios.patch("user/" + user?.address, {
        name,
        vpa,
      });

      set((state) => {
        state.user.data = user;
        state.user.status = "idle";
      });

      return;
    },
  },
});
