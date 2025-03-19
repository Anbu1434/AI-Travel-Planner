import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import OnboardingScreen from "../components/OnboardingScreen";
import { auth } from "../configs/FirebaseConfigs";
import { onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator, View } from "react-native";

const onboardingSlides = [
  {
    id: 1,
    title: "Plan Your Dream Trip",
    description:
      "Discover and plan your perfect journey with our AI-powered travel planner",
    image: "https://img.icons8.com/clouds/400/airplane-take-off.png",
  },
  {
    id: 2,
    title: "Smart Recommendations",
    description:
      "Get personalized suggestions for destinations, activities, and accommodations",
    image: "https://img.icons8.com/clouds/400/light-on.png",
  },
  {
    id: 3,
    title: "All in One Place",
    description:
      "Manage your itinerary, bookings, and travel documents effortlessly",
    image: "https://img.icons8.com/clouds/400/map-marker.png",
  },
];

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/Mytrip");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <OnboardingScreen slides={onboardingSlides} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="create-trip/search-place"
          options={{
            headerShown: true,
            headerTitle: "Search Place",
            headerTransparent: true,
            headerTintColor: "#000",
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
