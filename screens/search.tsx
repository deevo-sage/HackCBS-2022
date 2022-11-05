import { Flex, Input } from "native-base";
import { RootStackScreenProps } from "../types";
import { useEffect, useRef } from "react";
export function Search({ navigation }: RootStackScreenProps<"Search">) {
  const inputRef = useRef<any>();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Flex flex={1} px="4">
      <Input ref={inputRef} mt="4" placeholder="Search" />
    </Flex>
  );
}
