import { Formik } from "formik";
import {
  Box,
  Button,
  Column,
  Flex,
  Input,
  Row,
  Text,
  VStack,
} from "native-base";
import { useSetUser, useUser } from "../zustand";
import { RootStackScreenProps } from "../types";

export function Account({ navigation }: RootStackScreenProps<"Account">) {
  const user = useUser();
  const setUser = useSetUser();
  return (
    <Flex mx="4">
      <Row mb="4">
        <Text fontSize={"xl"}>Hello </Text>
        <Text fontSize={"xl"} color="brand.highlight" fontWeight={"semibold"}>
          {user?.name}
        </Text>
        <Text fontSize={"xl"}>!</Text>
      </Row>
      <Column alignItems={"flex-start"} mb="4">
        <Box
          borderBottomColor={"brand.highlight"}
          borderBottomWidth="2"
          borderBottomStyle={"solid"}
        >
          <Text>Account Details</Text>
        </Box>
      </Column>
      <Formik
        initialValues={{ name: user?.name || "", upi: user?.upi || "" }}
        onSubmit={(values) => {
          if (user && values.name != user.name) {
            setUser(values.name, values.upi);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => {
          return (
            <VStack space={"4"} alignItems="center">
              <Input
                placeholder="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              ></Input>
              <Input
                placeholder="UPI"
                onChangeText={handleChange("upi")}
                onBlur={handleBlur("upi")}
                value={values.upi}
              ></Input>
              <Text
                color={"brand.foreground"}
                fontSize="sm"
                px="2"
                lineHeight={"md"}
                textAlign="justify"
              >
                UPI ID is used to link the user’s wallet with the UPI ID and
                allow others to to find your crytpo wallet via UPI ID.
              </Text>
              <Button
                width={"66%"}
                isDisabled={
                  user?.name === values.name || values.name.length === 0
                }
                onPress={handleSubmit as any}
              >
                <Text color={"brand.bg"} fontWeight="semibold">
                  Save
                </Text>
              </Button>
            </VStack>
          );
        }}
      </Formik>
    </Flex>
  );
}
