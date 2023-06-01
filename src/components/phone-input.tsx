import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Stack, useNavigation } from "expo-router";
import {
  Box,
  Divider,
  HStack,
  Heading,
  IInputProps,
  IStackProps,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "native-base";
import { useMemo, useRef, useState } from "react";
import { Control, useController, useForm } from "react-hook-form";
import { Keyboard, TouchableOpacity } from "react-native";
import { mask } from "react-native-mask-text";

const prefixes = [
  {
    country: "Afghanistan",
    prefix: "93",
    mask: "(999) 999-9999",
  },

  {
    country: "Brazil",
    prefix: "55",
    mask: "(99) 99999-9999",
  },
];

type PhoneInputProps = IInputProps & {
  containerProps?: IStackProps;
  control: Control<any>;
};

export const PhoneInput = ({
  containerProps,
  control,
  ...props
}: PhoneInputProps) => {
  const [filter, setFilter] = useState("");

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const {
    field: { value: ddd, onChange: onChangeDdd },
  } = useController({ name: "ddd", control, defaultValue: prefixes[0].prefix });

  const {
    field: { ref, value: number, onChange: onChangeNumber },
    fieldState: { error },
  } = useController({ name: "number", control, defaultValue: "" });

  const phoneMask = useMemo(() => {
    const newMask = prefixes.find((item) => item.prefix === ddd)?.mask;
    onChangeNumber(mask(number, newMask));
    return newMask;
  }, [ddd]);

  const filteredOptions = useMemo(
    () =>
      prefixes.filter(
        (item) => item.country.includes(filter) || item.prefix.includes(filter)
      ),
    [filter]
  );

  return (
    <Box w="full">
      <HStack
        bg="gray.200"
        px="4"
        py="2"
        rounded="md"
        alignItems="center"
        {...containerProps}
      >
        <Stack.Screen options={{ animation: "slide_from_bottom" }} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef?.current?.present();
            Keyboard.dismiss();
          }}
        >
          <HStack alignItems="center" space="1">
            <Text fontSize="md" fontWeight="medium">
              +{ddd}
            </Text>
            <Icon
              as={<Ionicons name="chevron-down" />}
              size="sm"
              color="black"
            />
          </HStack>
        </TouchableOpacity>
        <Divider h="75%" ml="4" orientation="vertical" bg="gray.400" />
        <Input
          flex="1"
          variant="unstyled"
          placeholder="Your phone number here"
          fontSize="md"
          keyboardType="number-pad"
          onChangeText={(text) => onChangeNumber(mask(text, phoneMask))}
          maxLength={phoneMask?.length}
          ref={ref}
          value={number}
          {...props}
        />
      </HStack>
      {error?.message ? (
        <Text mt="2" color="red.500">
          {error?.message}
        </Text>
      ) : null}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["95%"]}
        handleComponent={null}
      >
        <VStack flex="1" bg="gray.100" roundedTop="lg" px="4" py="4">
          <HStack alignItems="center" justifyContent="center" mt="2">
            <IconButton
              variant="unstyled"
              position="absolute"
              left="0"
              p="0"
              onPress={() => bottomSheetRef?.current?.close()}
              icon={
                <Icon
                  as={<Ionicons name="ios-close-outline" />}
                  color="gray.600"
                  size="4xl"
                />
              }
            />
            <Heading fontSize="lg">Select Country Code</Heading>
          </HStack>
          <HStack
            bg="gray.200"
            px="3"
            alignItems="center"
            mt="4"
            mb="6"
            rounded="md"
          >
            <Icon as={<Ionicons name="search" />} />
            <Input
              variant="unstyled"
              placeholder="Search by name or number"
              placeholderTextColor="gray.400"
              fontSize="md"
              onChangeText={setFilter}
              value={filter}
            />
          </HStack>
          <VStack flex="1">
            <BottomSheetFlatList
              data={filteredOptions}
              contentContainerStyle={{
                paddingHorizontal: 16,
                backgroundColor: "white",
                borderRadius: 8,
              }}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChangeDdd(item.prefix);
                    bottomSheetRef?.current?.close();
                  }}
                >
                  <HStack
                    bg="white"
                    alignItems="center"
                    justifyContent="space-between"
                    py="3"
                    borderBottomWidth={
                      index === filteredOptions.length - 1 ? "0" : "1"
                    }
                    borderBottomColor="gray.300"
                  >
                    <Text fontSize="md">{item.country}</Text>
                    <Text fontSize="md" color="gray.500">
                      +{item.prefix}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              )}
            />
          </VStack>
        </VStack>
      </BottomSheetModal>
    </Box>
  );
};
