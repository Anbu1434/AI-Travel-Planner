import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default function TabLayout() {
  // Define colors as constants for better maintenance
  const COLORS = {
    active: '#000000',
    inactive: '#666666',
    background: '#FFFFFF',
    shadow: '#00000020',
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="Mytrip"
        options={{
          title: 'My Trips',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons 
              name="card-travel" 
              size={24} 
              color={focused ? COLORS.active : COLORS.inactive} 
            />
          ),
          tabBarAccessibilityLabel: 'My Trips',
        }}
      />
      <Tabs.Screen
        name="Discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <Entypo 
              name="globe" 
              size={24} 
              color={focused ? COLORS.active : COLORS.inactive} 
            />
          ),
          tabBarAccessibilityLabel: 'Discover',
        }}
      />
    
      <Tabs.Screen
        name="AI assist"
        options={{
          title: 'AI Assist',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons 
              name="assistant" 
              size={24} 
              color={focused ? COLORS.active : COLORS.inactive} 
            />
          ),
          tabBarAccessibilityLabel: 'AI Assistant',
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="people-circle-sharp" 
              size={24} 
              color={focused ? COLORS.active : COLORS.inactive} 
            />
          ),
          tabBarAccessibilityLabel: 'User Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    height: Platform.OS === 'ios' ? 85 : 65,
    marginBottom: Platform.OS === 'ios' ? 0 : 20,
    marginHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#00000010',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarItem: {
    paddingVertical: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
  },
});