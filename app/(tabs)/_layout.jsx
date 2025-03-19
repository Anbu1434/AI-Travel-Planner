import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "black" }}>

      <Tabs.Screen 
        name="Mytrip"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="card-travel" size={24} color="black" />
        }}
      />
      <Tabs.Screen 
        name="Discover"
        options={{
          tabBarIcon: ({ color }) => <Entypo name="globe" size={24} color={color} />
        }}
      />
      <Tabs.Screen 
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="people-circle-sharp" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}
