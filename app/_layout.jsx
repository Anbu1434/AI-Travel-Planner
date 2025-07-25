import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { CreateTripContext } from '../context/CreateTripContext';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Layout() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  // Trip data state
  const [tripData, setTripData] = useState([]);

  // Show loader until fonts load
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <CreateTripContext.Provider
      value={{
        tripData,
        // @ts-ignore
        setTripData,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false, // This will hide headers for all screens
        }}
      >
        {/* SearchPlace Screen (Default Screen) */}
        <Stack.Screen name="index" />
        
        {/* SelectTravel Screen */}
        <Stack.Screen name="SelectTravel" />
      </Stack>
    </CreateTripContext.Provider>
    
  );
}