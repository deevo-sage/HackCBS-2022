import { ethers } from "ethers";
import { Flex, Spinner, Text } from "native-base";
import { useEffect } from "react";
import { Transaction as TxnType } from "../graphql/generated-types/graphql-operations";
import { RootStackScreenProps } from "../types";
import { addressCompress } from "../utils";
import { useTransactionData } from "../zustand";

export function Transaction({
  navigation,
  route: { params },
}: RootStackScreenProps<"Transaction">) {
  const transaction = useTransactionData();

  useEffect(() => {
    if (transaction?.status === "SUCCESS") {
      setTimeout(() => {
        // navigation.pop(3)
        // navigation.navigate("Home");
      }, 2000);
    }
  }, [transaction?.status]);
  if (!transaction) {
    //navigation.navigate("Home");
    return null;
  }

  function getStatusText() {
    switch (transaction?.status) {
      case "PENDING":
        return "Crypto Transaction Ongoing";
      case "CRYPTO_SUCCESS":
        return "Fiat Transaction Ongoing";
      case "SUCCESS":
        return "Transaction Successful";
      case "FAILURE":
        return "Transaction Failure";
      default:
        return "Transaction Pending";
    }
  }

  function getHelperText() {
    switch (transaction?.status) {
      case "PENDING":
        return "This may take 2-5mins";
      case "CRYPTO_SUCCESS":
        return "Few seconds remaining";
      case "SUCCESS":
        return "";
      case "FAILURE":
        return "Transaction Failed";
      default:
        return "";
    }
  }

  return (
    <Flex flex="1" paddingX="6">
      <Flex flex="1" alignItems="center" justifyContent="center">
        <Loader
          loading={transaction.status !== "SUCCESS"}
          amount={transaction?.FIAT}
        />
        <Text fontSize="lg" marginTop="8">
          {getStatusText()}
        </Text>
        <Text>{getHelperText()}</Text>
      </Flex>
      <TxnDetails transaction={transaction} />
    </Flex>
  );
}

function Loader({ loading, amount }: { loading: boolean; amount: number }) {
  return loading ? (
    <Spinner size={"lg"} color="brand.highlight" />
  ) : (
    <Text color="success.500" textAlign="center" fontSize="xl">
      ₹ {amount} Sent{"\n"}Successfully
    </Text>
  );
}

function TxnDetails({ transaction }: { transaction: TxnType }) {
  return (
    <Flex
      marginBottom="16"
      padding="2"
      borderRadius="md"
      borderWidth="1"
      borderColor="brand.mute"
    >
      <Text fontSize="xl" fontWeight={"bold"}>
        Transaction Details
      </Text>
      {transaction?.chain && <Text>chain : {chainMap[transaction.chain]}</Text>}
      {transaction.FIAT && <Text>Fiat amount : ₹ {transaction.FIAT}</Text>}
      {transaction.Crypto && (
        <Text>
          Crypto amount:{" "}
          {convertCrypto(transaction.Crypto)
            .split(".")
            .reduce(
              (prev, curr, i) =>
                i === 0 ? prev + curr : prev + "." + curr.substring(0, 4),
              ""
            )}
          &nbsp;
          {chainToCoin[transaction.chain]}
        </Text>
      )}
      {transaction.from && <Text>from : {transaction.from}</Text>}
      {transaction.to && <Text>to : {transaction.to}</Text>}
      {transaction.txnHash && (
        <Text>TxnHash :{addressCompress(transaction.txnHash)}</Text>
      )}
    </Flex>
  );
}

const chainMap = {
  MAT: "Matic Mumbai",
};

const chainToCoin = {
  MAT: "MATIC",
};

const convertCrypto = (str: string) => {
  const num = BigInt(str);
  return ethers.utils.formatEther(num);
};
