import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { useNavigation } from '@react-navigation/native';

export default function Mytrip() {
  const [userTrips, setUserTrips] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 55,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      {/* Header Section */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontFamily: 'outfit-bold', // Add fallback if font not loaded
            marginLeft: 30,
          }}
        >
          Mytrip ✈️
        </Text>
       
      </View>

      {/* Render StartNewTripCard if no trips */}
      {userTrips?.length === 0 ? <StartNewTripCard /> : null}
    </View>
  );
}
