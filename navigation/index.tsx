import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { colors, navigationTheme } from "../constants/nativeBase";
import { Home, WalletConnect, Vault, Account } from "../screens";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useUserFetch } from "../zustand";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? navigationTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const connector = useWalletConnect();
  const fetchUser = useUserFetch();
  React.useEffect(() => {
    if (connector?.accounts?.[0]) {
      fetchUser(connector.accounts[0]);
    }
  }, [connector.accounts]);
  if (!connector?.accounts?.[0]) {
    return (
      <Stack.Navigator
        initialRouteName="WalletConnect"
        screenOptions={{
          headerStyle: { backgroundColor: colors.brand.bg },
          headerShadowVisible: false,
          title: "",
          animation: "none",
        }}
      >
        <Stack.Screen name="WalletConnect" component={WalletConnect} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerStyle: { backgroundColor: colors.brand.bg },
        headerShadowVisible: false,
        title: "",
        // header: () => {
        //   return (
        //     <SafeAreaView style={{ backgroundColor: colors.brand.bg }}>
        //       <Flex direction="row" bg="brand.bg"></Flex>
        //     </SafeAreaView>
        //   );
        // },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="Vault"
        component={Vault}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
