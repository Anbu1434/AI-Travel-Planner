import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { BudgetList } from '../../context/option';

export default function SelectBudget() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleOptionSelect = (item) => {
    setSelectedOption(item);
    // Show selection feedback
    Alert.alert(
      "Budget Selected",
      `You've selected the ${item.name} plan`,
      [{ text: "OK" }]
    );
  };

  const handleContinue = async () => {
    if (!selectedOption) {
      Alert.alert("Selection Required", "Please select a budget plan to continue");
      return;
    }

    try {
      setIsLoading(true);
      // Here you can add any additional logic before navigation
      // For example, saving the selection to a global state or API
      
      // Navigate to next screen with selected budget
      navigation.navigate('total', {
        selectedBudget: selectedOption
      });
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
      }}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Main Content */}
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          fontFamily: 'outfit-bold',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        Set Your Travel Budget
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontFamily: 'outfit-medium',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        How do you prefer to spend on this trip?
      </Text>

      <FlatList
        data={BudgetList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={{
              marginVertical: 8,
              paddingHorizontal: 5,
            }}
            onPress={() => handleOptionSelect(item)}
          >
            <OptionCard
              option={item}
              selectedOption={selectedOption}
              onSelect={() => handleOptionSelect(item)}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />

      {/* Continue Button */}
      <View style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
      }}>
        <TouchableOpacity
          onPress={handleContinue}
          style={{
            backgroundColor: selectedOption ? '#007AFF' : '#E0E0E0',
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            opacity: isLoading ? 0.7 : 1,
          }}
          disabled={!selectedOption || isLoading}
        >
          <Text style={{
            color: selectedOption ? 'white' : '#666',
            fontSize: 18,
            fontFamily: 'outfit-medium',
          }}>
            {isLoading ? 'Processing...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}