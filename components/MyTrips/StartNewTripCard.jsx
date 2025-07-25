import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import locationAnimation from '../../assets/animation/location.json';
import { useRouter } from 'expo-router'; // Changed to use expo-router

export default function StartNewTripCard() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Using expo-router's useRouter instead of react-navigation

  const handlePress = () => {
    setIsLoading(true);
    router.push('/create-trip/serach-place'); // Corrected route name and using expo-router navigation
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Illustration Animation */}
      <LottieView
        source={locationAnimation}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />

      <Text style={styles.title}>No Trip Planned Yet</Text>

      <Text style={styles.subtitle}>
        Looks like it's time to plan a new travel experience! Get started below.
      </Text>

      <TouchableOpacity
        style={styles.get}
        onPress={handlePress}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Plan Your Trip</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 90,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  subtitle: {
    color: 'grey',
    fontFamily: 'outfit-regular',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 0,
  },
  get: {
    backgroundColor: '#000',
    height: 50,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
});