import { useStore } from "../store";

export function useUser() {
  return useStore((state) => state.user.data);
}

export function useSetUser() {
  return useStore((state) => state.user.set);
}
