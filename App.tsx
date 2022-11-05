import "react-native-get-random-values";
import "@ethersproject/shims";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./global";
import { theme } from "./constants/nativeBase";
import axios from "axios";

axios.defaults.baseURL = process.env.SERVER_URL;

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <WalletConnectProvider
        redirectUrl={
          Platform.OS === "web" ? window.location.origin : "yonkopay://"
        }
        storageOptions={{
          asyncStorage: AsyncStorage,
        }}
      >
        <NativeBaseProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation colorScheme={"dark"} />
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </WalletConnectProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
