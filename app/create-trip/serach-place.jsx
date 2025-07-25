import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Keyboard,
  Animated,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import { searchMapboxPlaces } from '../../configs/MapboxConfigs';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router';

export default function SearchPlace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // New state for input focus
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  // Animation state
  const placeholderAnim = useRef(new Animated.Value(1)).current;
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    'Search for a place',
    'Search for "Goa"',
    'Search for "Paris"',
    'Search for "Tokyo"',
    'Search for "New York"',
  ];

  // Set navigation options
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

  // Animate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(placeholderAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(placeholderAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const animatedOpacity = placeholderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Debounced search function
  const handleSearch = useCallback(
    debounce(async (query) => {
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
    }, 300),
    []
  );

  // Handle place selection
  const handleSelectPlace = useCallback(
    async (item) => {
      try {
        Keyboard.dismiss();
        if (!item?.geometry?.lat || !item?.geometry?.lon) {
          throw new Error('Invalid place data');
        }

        const location = {
          lat: item.geometry.lat,
          lon: item.geometry.lon,
        };

        setTripData((prev) => ({
          ...prev,
          location,
          placeName: item.name,
          description: item.description,
          photoReference: item.photoReference,
          url: item.url,
        }));

        router.push({
          pathname: '../create-trip/SelectTravel',
          params: {
            location: JSON.stringify(location),
            placeName: item.name,
            description: item.description,
            photoReference: item.photoReference,
            url: item.url,
          },
        });
      } catch (err) {
        Alert.alert('Error', 'Failed to select place. Please try again.');
      }
    },
    [navigation, setTripData]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => handleSelectPlace(item)}
      >
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeType}>{item.description}</Text>
      </TouchableOpacity>
    ),
    [handleSelectPlace]
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          {/* Show placeholder only when input is empty and not focused */}
          {!isFocused && !searchQuery && (
            <Animated.Text
              style={[
                styles.placeholderText,
                {
                  opacity: animatedOpacity,
                },
              ]}
            >
              {placeholders[placeholderIndex]}
            </Animated.Text>
          )}
          <TextInput
            style={styles.textInput}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
        </View>
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
          !loading && searchQuery.length > 2 && results.length === 0 && (
            <Text style={styles.emptyText}>No results found.</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    padding: 16,
    paddingTop: 80,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  inputContainer: {
    position: 'relative',
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
  placeholderText: {
    position: 'absolute',
    left: 16,
    top: 15,
    fontSize: 16,
    color: '#666',
    zIndex: 1,
    pointerEvents: 'none',
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