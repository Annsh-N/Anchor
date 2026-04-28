import { useMemo } from "react";
import { NativeModules, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "AR">;

const colors = {
  accentPink: "#F55476",
  canvas: "#FFF8F2",
  text: "#1f2937",
  muted: "#6b7280",
  border: "#f2d9bf",
  white: "#ffffff",
};

export default function ARScreenEntry({ navigation }: Props) {
  const hasViroNativeModule = !!NativeModules.VRTMaterialManager;

  const ARScreenComponent = useMemo(() => {
    if (!hasViroNativeModule) {
      return null;
    }
    return require("./ARScreen").default;
  }, [hasViroNativeModule]);

  if (!hasViroNativeModule || !ARScreenComponent) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>AR Unavailable</Text>
          <Text style={styles.body}>
            The Viro native module is not loaded in this build. Rebuild the iOS app
            from the native workspace or dev client, then try AR again.
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <ARScreenComponent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
  button: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.accentPink,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
