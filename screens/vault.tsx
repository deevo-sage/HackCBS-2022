import { Box, Button, Flex, Select, Text, VStack } from "native-base";
import { RootStackScreenProps } from "../types";

export function Vault({ navigation }: RootStackScreenProps<"Vault">) {
  return (
    <Flex
      px="4"
      justifyContent="space-between"
      flex="1"
      pb="10"
      alignItems={"center"}
    >
      <Flex w="100%" align={"flex-start"}>
        <Box borderBottomColor="brand.highlight" borderBottomWidth={"2"}>
          <Select
            defaultValue="maticmum"
            minWidth="175"
            borderColor={"brand.bg"}
            variant="underlined"
            placeholder="Chain Select"
          >
            <Select.Item value="maticmum" label="Matic Mumbai"></Select.Item>
          </Select>
        </Box>
      </Flex>
      <VStack space={"0"} w="100%" alignItems={"center"}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Balance
        </Text>
        <Text fontSize={"3xl"} fontFamily="space-mono">
          110 MATIC
        </Text>
      </VStack>
      <VStack space={"4"} w="100%" alignItems={"center"}>
        <Button width={"66%"}>
          <Text color={"brand.bg"} fontWeight="semibold">
            Pay
          </Text>
        </Button>
        <Button variant={"outline"} bg="transparent" width={"66%"}>
          <Text color={"brand.highlight"} fontWeight="semibold">
            Withdraw
          </Text>
        </Button>
      </VStack>
    </Flex>
  );
}
