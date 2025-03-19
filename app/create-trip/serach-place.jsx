import React, { useState, useCallback } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchMapboxPlaces } from '../../configs/MapboxConfigs';
import { useEffect } from 'react';

export default function SearchPlace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Search Place',
      headerShown: true,
      headerTransparent: true,
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: 'transparent',
      },
    });
  }, [navigation]);

  const handleSearch = useCallback(async (query) => {
    if (query.length > 2) {
      try {
        setLoading(true);
        setError(null);
        const places = await searchMapboxPlaces(query);
        setResults(places);
      } catch (err) {
        setError('Failed to fetch places. Please try again.');
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  }, []);

  const handleSelectPlace = useCallback((item) => {
    try {
      const location = {
        lat: item.geometry.coordinates[1],
        lon: item.geometry.coordinates[0],
      };
      navigation.navigate('CreateTrip', {
        location,
        placeName: item.place_name,
      });
    } catch (err) {
      console.error('Navigation error:', err);
      Alert.alert('Error', 'Failed to select place. Please try again.');
    }
  }, [navigation]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity 
      style={styles.resultItem}
      onPress={() => handleSelectPlace(item)}
    >
      <Text style={styles.placeName}>{item.place_name}</Text>
      {item.place_type && (
        <Text style={styles.placeType}>{item.place_type[0]}</Text>
      )}
    </TouchableOpacity>
  ), [handleSelectPlace]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search for a place"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>
      
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading && searchQuery.length > 2 && (
            <Text style={styles.emptyText}>No places found</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    padding: 16,
    paddingTop: 80,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  textInput: {
    height: 50,
    borderRadius: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#FFE5E5',
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  resultItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});
