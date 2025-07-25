import { Stack } from 'expo-router';
import React from 'react';

export default function CreateTripLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="SelectTravel"
        options={{
          title: 'Select Travel Type',
        }}
      />
      <Stack.Screen
        name="select-buget"
        options={{
          title: 'Select Budget',
        }}
      />
      <Stack.Screen
        name="select-dates"
        options={{
          title: 'Select Dates',
        }}
      />
      <Stack.Screen
        name="serach-place"
        options={{
          title: 'Search Place',
        }}
      />
      <Stack.Screen
        name="total"
        options={{
          title: 'My Trips',
        }}
      />
      <Stack.Screen
        name="trip-details"
        options={{
          title: 'Trip Details',
        }}
      />
      <Stack.Screen
        name="trip-plan"
        options={{
          title: 'Trip Plan',
        }}
      />
    </Stack>
  );
} 