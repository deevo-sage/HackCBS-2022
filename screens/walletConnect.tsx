import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Button, Flex, Text } from "native-base";
import { useEffect } from "react";
import { RootStackScreenProps } from "../types";

export function WalletConnect({
  navigation,
}: RootStackScreenProps<"WalletConnect">) {
  const connector = useWalletConnect();

  useEffect(() => {
    if (connector && connector.accounts?.length > 0) {
      navigation.navigate("Home");
    }
  }, [connector]);

  const connectWallet = () => {
    if (connector?.accounts?.length > 0) {
      killSession();
    }
    return connector?.connect?.();
  };
  const killSession = () => {
    return connector.killSession();
  };
  return (
    <Flex flex="1" justifyContent="center" alignItems="center">
      <Button onPress={connectWallet}>
        <Text color="brand.bg" fontWeight="bold">
          Connect Wallet
        </Text>
      </Button>
    </Flex>
  );
}
