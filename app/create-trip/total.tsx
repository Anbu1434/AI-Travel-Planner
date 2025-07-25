import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

type Trip = {
  id: string;
  location: string;
  date: string;
  travelingWith: string;
  image: string;
};

const tripsData: Trip[] = [
  {
    id: '1',
    location: 'Las Vegas, NV, USA',
    date: '05 Jul 2024',
    travelingWith: 'Friends',
    image: 'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?q=80&w=1000',
  },
  {
    id: '2',
    location: 'Las Vegas, NV, USA',
    date: '05 Jul 2024',
    travelingWith: 'Friends',
    image: 'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?q=80&w=1000',
  },
];

const TripsScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const renderTripItem = ({ item }: { item: Trip }) => (
    <TouchableOpacity 
      style={styles.tripCard}
      onPress={() => router.push({
        pathname: '/create-trip/trip-details',
        params: { tripId: item.id }
      })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.tripImage}
        resizeMode="cover"
      />
      <View style={styles.tripInfo}>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.travelingWith}>Traveling: {item.travelingWith}</Text>
        <TouchableOpacity 
          style={styles.planButton}
          onPress={() => router.push({
            pathname: '/create-trip/trip-plan',
            params: { tripId: item.id }
          })}
        >
          <Text style={styles.planButtonText}>See your plan</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
        <TouchableOpacity 
          onPress={() => router.push('/create-trip/SelectTravel')}
          style={styles.addButton}
        >
          <Ionicons name="add" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tripsData}
        renderItem={renderTripItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => router.push('/create-trip/total')}
        >
          <Ionicons name="map" size={24} color="#000" />
          <Text style={[styles.navText, styles.activeNavText]}>My Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/discover')}
        >
          <Ionicons name="globe" size={24} color="#666" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'outfit-bold',
  },
  addButton: {
    padding: 4,
  },
  list: {
    padding: 16,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tripInfo: {
    padding: 16,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'outfit-bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: 'outfit-regular',
  },
  travelingWith: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: 'outfit-regular',
  },
  planButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  planButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'outfit-medium',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: '#f0f0f0',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
    fontFamily: 'outfit-regular',
  },
  activeNavText: {
    color: '#000',
    fontFamily: 'outfit-medium',
  },
});

export default TripsScreen; 