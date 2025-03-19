import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export type OnboardingSlide = {
  id: number;
  title: string;
  description: string;
  image: string;
};

interface OnboardingScreenProps {
  slides: OnboardingSlide[];
  onComplete?: () => void;
  nextRoute?: string;
}

export default function OnboardingScreen({
  slides,
  onComplete,
  nextRoute = 'auth/sign-in',
}: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.slideContainer}>
        <Image
          source={{ uri: slides[currentSlide].image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title} selectable={false}>
          {slides[currentSlide].title}
        </Text>
        <Text style={styles.description} selectable={false}>
          {slides[currentSlide].description}
        </Text>
      </Pressable>

      <View style={styles.buttonContainer}>
        {currentSlide < slides.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/auth/sign-in')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
