import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useDisableGoBack = () => {
  useEffect(() => {
    return BackHandler.addEventListener("hardwareBackPress", () => false)
      .remove;
  }, []);
};
