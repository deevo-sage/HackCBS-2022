import { Flex, Row, Text } from "native-base";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { addressCompress } from "../utils";
import { RootStackScreenProps } from "../types";

export function Home({ navigation }: RootStackScreenProps<"Home">) {
  const connector = useWalletConnect();

  return (
    <Flex flex="1">
      <Row mb="0" mx="4">
        <Text fontSize={"xl"}>Welcome </Text>
        <Text fontSize={"xl"} color="brand.highlight" fontWeight={"semibold"}>
          {addressCompress(connector?.accounts?.[0])}
        </Text>
      </Row>
    </Flex>
  );
}
