import { useStore } from "../store";

export function useTransaction() {
  return useStore((store) => store.transaction);
}
export function useInitiateDebit() {
  return useStore((store) => store.transaction.start);
}
export function useTransactionData() {
  return useStore((store) => store.transaction.data);
}
export function useSetTo() {
  return useStore((store) => store.transaction.updateTo);
}
