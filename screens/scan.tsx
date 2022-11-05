import { Flex, Input, Text } from "native-base";
import { RootStackScreenProps } from "../types";
import { Camera } from "expo-camera";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export function Scan({ navigation }: RootStackScreenProps<"Scan">) {
  const onSuccess = (ev) => {
    console.log(ev.data);
    navigation.navigate("Pay", { data: ev.data });
  };
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  return (
    <Flex
      background={"black"}
      justifyContent={"center"}
      alignItems="center"
      flex={1}
    >
      {hasPermission && (
        <Camera
          style={{
            flex: 1,
            width: Dimensions.get("screen").width,
            backgroundColor: "blue",
          }}
          onBarCodeScanned={onSuccess}
        />
      )}
      <Flex position={"absolute"} pb={150} flex="1">
        <Icon
          name="scan-helper"
          color={"white"}
          size={Dimensions.get("screen").width - 100}
        />
      </Flex>
      <Flex
        position={"absolute"}
        left={0}
        right={0}
        bottom={0}
        h="150"
        alignItems={"center"}
        borderTopColor="brand.highlight"
        borderWidth={"2"}
        borderTopRadius="12"
        bgColor={"brand.bg"}
        px="4"
      >
        <Flex
          borderColor={"brand.highlight"}
          w="100"
          borderRadius={"10"}
          borderWidth="1"
          mt="2"
        ></Flex>
        <Input
          mt="8"
          onPressIn={() => {
            navigation.navigate("Search");
          }}
          isDisabled
          placeholder="Search"
        />
      </Flex>
    </Flex>
  );
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});
