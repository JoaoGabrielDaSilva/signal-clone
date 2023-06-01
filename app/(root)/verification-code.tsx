import { Box, HStack, Heading, Input, Text, VStack } from "native-base";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Alert, Keyboard, Dimensions } from "react-native";

type FormData = {
  code: { value: string }[];
};

const { width } = Dimensions.get("window");

export default function VerificationCode() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { control, setFocus, handleSubmit, getValues } = useForm<FormData>({
    defaultValues: {
      code: Array(6).fill({ value: "" }),
    },
  });

  const { fields } = useFieldArray({ control, name: "code" });

  const router = useRouter();

  const navigation = useNavigation();

  const onSubmit = (data: FormData) => {
    Alert.alert("Sucesso");
    console.log(data);
    Keyboard.dismiss();
  };

  return (
    <Box safeArea flex="1">
      <VStack p="4">
        <VStack alignItems="center" space="2">
          <Heading>Verification Code</Heading>
          <Text color="gray.500">Enter the code we sent to +{phone}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({ routes: [{ name: "(root)/login" }] })
            }
          >
            <Text color="blue.500" mt="2">
              Wrong number?
            </Text>
          </TouchableOpacity>

          <HStack space="3" px="4">
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`code.${index}.value`}
                render={({ field: { onChange, ref, value } }) => {
                  return (
                    <Input
                      variant="unstyled"
                      h={`${width * 0.17}px`}
                      flex="1"
                      textAlign="center"
                      fontSize="xl"
                      fontWeight="bold"
                      borderBottomWidth="2"
                      rounded="none"
                      borderBottomColor="black"
                      value={value}
                      ref={ref}
                      onKeyPress={({ nativeEvent: { key } }) => {
                        onChange(key);
                        if (index !== 5) {
                          setFocus(`code.${index + 1}.value`);
                        } else {
                          handleSubmit(onSubmit)();
                        }
                      }}
                      maxLength={1}
                      keyboardType="number-pad"
                      color="black"
                    />
                  );
                }}
              />
            ))}
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
