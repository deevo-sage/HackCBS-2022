import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, theme } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </NativeBaseProvider>
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
