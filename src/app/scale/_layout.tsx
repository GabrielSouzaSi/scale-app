import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScaleLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
        translucent={false}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </View>
  );
};

export default ScaleLayout;
