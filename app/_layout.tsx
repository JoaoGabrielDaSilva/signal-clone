import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

export default function Root() {
  return (
    <NativeBaseProvider>
      <BottomSheetModalProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(root)/login" />
          <Stack.Screen
            name="(root)/verifying-number"
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="(root)/verification-code"
            options={{
              gestureEnabled: false,
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </NativeBaseProvider>
  );
}
