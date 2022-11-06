import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Button, Flex, Text } from "native-base";
import { useEffect } from "react";
import { RootStackScreenProps } from "../types";
import Onboarding from "react-native-onboarding-swiper";
import { Image } from "react-native";
import { colors } from "../constants/nativeBase";
import o1 from "../assets/images/connect.png";
import o2 from "../assets/images/vault.png";
import o3 from "../assets/images/p2p.png";
const onboardings = [o1, o2, o3];
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
    <Onboarding
      pages={[
        {
          backgroundColor: colors.brand.bg,
          image: (
            <Image
              source={onboardings[0]}
              style={{ width: 200, height: 200 }}
            />
          ),
          title: "Connect",
          subtitle: "Connect your crypto wallet seemlessly",
        },
        {
          backgroundColor: colors.brand.bg,
          image: (
            <Image
              source={onboardings[1]}
              style={{ width: 200, height: 200 }}
            />
          ),
          title: "Vault",
          subtitle: "Keep your money secure in the vault",
        },
        {
          backgroundColor: colors.brand.bg,
          image: (
            <Image
              source={onboardings[2]}
              style={{ width: 200, height: 200 }}
            />
          ),
          title: "Pay",
          subtitle: "Crypto to UPI payments made easy",
        },
      ]}
      showDone
      showSkip={false}
      onDone={() => connectWallet()}
    />
  );
}
//<Button onPress={connectWallet}>
//       <Text color="brand.bg" fontWeight="bold">
//         Connect Wallet
//       </Text>
//     </Button>
