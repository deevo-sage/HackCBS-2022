import { useStore } from "../store";

export function useUser() {
  return useStore((state) => state.user.data);
}

export function useSetUser() {
  return useStore((state) => state.user.updateUser);
}

export function useUserFetch() {
  return useStore((state) => state.user.onSignin);
}
