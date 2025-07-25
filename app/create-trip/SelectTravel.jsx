import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SelectTravelList } from '../../context/option';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTravel() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  // Safe JSON parse to prevent crashes
  const location = params.location ? JSON.parse(params.location) : {};

  useEffect(() => {
    console.log('Component mounted or params changed');
    console.log('Location:', location);
  }, [params]);

  useEffect(() => {
    if (selectedOption) {
      setTripData({ ...tripData, traveler: selectedOption });
    }
  }, [selectedOption]);

  useEffect(() => {
    console.log('Trip Data:', tripData);
  }, [tripData]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Header and Subtitle */}
      <Text style={styles.header}>Who's Traveling?</Text>
      <Text style={styles.subtitle}>
        Select the type of travelers to personalize your experience
      </Text>

      {/* FlatList to Render Options */}
      <FlatList
        data={SelectTravelList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedOption(item.title)}
            style={styles.section}
          >
            <OptionCard option={item} selectedOption={selectedOption} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id?.toString() || item.title}
        showsVerticalScrollIndicator={false}
      />

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => selectedOption && router.push('/create-trip/select-dates')}
        disabled={!selectedOption}
        style={[
          styles.continueButton,
          { opacity: selectedOption ? 1 : 0.5 },
        ]}
      >
        <Text style={styles.main}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    height: '100%',
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 18,
    zIndex: 1,
    padding: 1,
  },
  header: {
    paddingTop: 25,
    fontSize: 30,
    fontFamily: 'outfit-bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'outfit-regular',
    color: 'grey',
    marginVertical: 12,
  },
  section: {
    width: 300,
    height: 90,
    marginBottom: 10,
    marginTop: 5,
  },
  continueButton: {
    marginTop: 20,
    marginBottom: 65,
    width: 260,
  },
  main: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: 'white',
    backgroundColor: 'black',
    padding: 3,
    borderRadius: 10,
    textAlign: 'center',
    marginLeft:25,
   
  },
});
