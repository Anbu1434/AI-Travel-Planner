import { Stack, Slot } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Or show a loading spinner
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Slot />
    </Stack>
  );
}
