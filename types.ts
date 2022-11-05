import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: undefined;
  Scan: undefined;
  Pay: undefined;
  Transaction: undefined;
  Account: undefined;
  Search: undefined;
  Vault: undefined;
  NotFound: undefined;
  WalletConnect: undefined;
};

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
