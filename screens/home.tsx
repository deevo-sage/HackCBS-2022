import { Avatar, Button, Column, Flex, Row, Text } from "native-base";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { addressCompress } from "../utils";
import { RootStackParamList, RootStackScreenProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../zustand";

export function Home({ navigation }: RootStackScreenProps<"Home">) {
  const connector = useWalletConnect();
  const user = useUser();
  return (
    <Flex flex="1">
      <Row mb="0" mx="4">
        <Text fontSize={"xl"}>Welcome </Text>
        <Text fontSize={"xl"} color="brand.highlight" fontWeight={"semibold"}>
          {addressCompress(user?.address || "")}
        </Text>
      </Row>
      <Column mt="12" w="100%" alignItems={"center"} space="4">
        <Row
          w="85%"
          p="4"
          borderRadius={4}
          justifyContent={"space-between"}
          borderColor={"brand.mute"}
          borderWidth="2"
        >
          {buttons.map((item, i) => {
            return <PressableWithIcon {...item} key={i} />;
          })}
        </Row>
      </Column>
    </Flex>
  );
}

interface PressableWithIconProps {
  icon: string;
  title: string;
  screen?: keyof RootStackParamList;
}

const buttons: PressableWithIconProps[] = [
  { icon: "", title: "User", screen: "Account" },
  { icon: "", title: "Vault", screen: "Vault" },
  { icon: "", title: "Scan and pay", screen: "Scan" },
];

function PressableWithIcon({ icon, title, screen }: PressableWithIconProps) {
  const nav = useNavigation();
  return (
    <Button
      variant="ghost"
      p={0}
      bg="transparent"
      h="70"
      flex={"1"}
      isDisabled={!screen}
      onPress={() => {
        nav.navigate(screen as any);
      }}
    >
      <Flex alignItems={"center"} flex="1">
        <Avatar bg="brand.foreground" mb="2" />
        <Text>{title}</Text>
      </Flex>
    </Button>
  );
}
