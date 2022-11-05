import {
  View,
  Button,
  Flex,
  Input,
  IInputProps,
  Select,
  Text,
  Pressable,
} from "native-base";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { RootStackScreenProps } from "../types";
import { Keyboard, TextInput } from "react-native";
import { useInitiateDebit, useSetTo, useTransaction } from "../zustand";
export function Pay({
  navigation,
  route: { params },
}: RootStackScreenProps<"Pay">) {
  const [_upi, setUpi] = useState(params?.data);
  const inputRef = useRef<TextInput>();
  const setTo = useSetTo();
  const pay = useInitiateDebit();
  const t = useTransaction();

  useEffect(() => {
    setTo(params?.data || "test@ok");
    setUpi(params?.data);
  }, [params?.data]);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  const [value, setValue] = useState(10);

  return (
    <Pressable flex={1} onPress={() => Keyboard.dismiss()}>
      <Flex flex={1}>
        <Flex alignItems={"center"}>
          <Text fontSize={"2xl"}>Pay</Text>
          <PriceInput
            inputRef={inputRef}
            onChangeVal={(val) => setValue(val)}
          />
        </Flex>
        <Flex
          position={"absolute"}
          left={0}
          right={0}
          bottom={0}
          h="200"
          mb={50}
          borderTopColor="brand.highlight"
          borderWidth={"2"}
          borderTopRadius="12"
          bgColor={"brand.bg"}
          px="4"
        >
          <Flex alignItems={"center"}>
            <Flex
              borderColor={"brand.highlight"}
              w="100"
              borderRadius={"10"}
              borderWidth="1"
              mt="2"
            ></Flex>
          </Flex>
          <Select mt="4" defaultValue="vault">
            <Select.Item value="vault" label="Vault"></Select.Item>
          </Select>

          <Button
            mt="4"
            isDisabled={t.status === "loading"}
            disabled={t.status === "loading"}
            onPress={() =>
              pay(value).then((bool) => bool && navigation.push("Transaction"))
            }
          >
            <Text color={"brand.bg"} fontWeight="700">
              Pay
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Pressable>
  );
}

interface InputProps extends IInputProps {
  inputRef?: MutableRefObject<TextInput | undefined>;
  onChangeVal?: (val: number) => void;
}
export function PriceInput({ inputRef, onChangeVal, ...props }: InputProps) {
  const ref = useRef<TextInput>();
  const [value, setValue] = useState("0");
  const symbol = "₹ ";
  const maxVal = 10000;

  const onClick = (_i: number) => {
    ref?.current?.focus();
  };

  const onChangeValue = (val: string) => {
    let number: string | number = Number(val);
    if (number > maxVal) number = maxVal;
    onChangeVal?.(number);
    setValue(number + "");
  };

  return (
    <View>
      <View flexDirection="row">
        <Text fontSize="xl">{symbol}&nbsp;</Text>
        {value.split("").map((item, i) => (
          <Text onPress={() => onClick(i)} display={"flex"} fontSize="xl">
            {item}
          </Text>
        ))}
      </View>

      <Input
        InputLeftElement={<Text fontSize={"2xl"}>₹</Text>}
        variant={"unstyled"}
        h="0"
        color={"white"}
        fontSize={"2xl"}
        style={{ color: "white", fontSize: 30 }}
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeValue}
        ref={(r) => {
          ref.current = r;
          if (inputRef?.current) inputRef.current = r;
        }}
        {...props}
      />
    </View>
  );
}
