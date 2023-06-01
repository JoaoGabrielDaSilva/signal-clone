import { useLocalSearchParams, useRouter } from "expo-router";
import { Center, Spinner, Text } from "native-base";
import { useDisableGoBack } from "../../src/hooks/use-disable-go-back";
import { useEffect } from "react";

export default function VerifyingNumber() {
  useDisableGoBack();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        router.push({
          pathname: "verification-code",
          params: { phone },
        }),
      1500
    );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Center flex="1">
      <Spinner
        color="blue.500"
        size="lg"
        mb="10"
        style={{ transform: [{ scale: 2 }] }}
      />
      <Text fontSize="md">Verifying +{phone}...</Text>
    </Center>
  );
}
