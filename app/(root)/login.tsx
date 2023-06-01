import { Box, Heading, Text, VStack } from "native-base";
import { PhoneInput } from "../../src/components/phone-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TouchableOpacity } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

const formSchema = z.object({
  ddd: z.string(),
  number: z.string().min(1, { message: "Please enter phone number" }),
});

type FormData = z.infer<typeof formSchema>;

export default function Login() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = ({ ddd, number }: FormData) => {
    router.push({
      pathname: "verifying-number",
      params: {
        phone: `${ddd} ${number}`,
      },
    });
  };

  return (
    <Box safeArea flex="1">
      <VStack p="4">
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text
            color="blue.500"
            fontWeight="semibold"
            fontSize="md"
            textAlign="right"
          >
            Next
          </Text>
        </TouchableOpacity>
        <VStack alignItems="center" space="2">
          <Heading>Your Phone Number</Heading>
          <Text color="gray.500">Enter your phone number to get started.</Text>
          <PhoneInput control={control} containerProps={{ mt: "2" }} />
        </VStack>
      </VStack>
    </Box>
  );
}
