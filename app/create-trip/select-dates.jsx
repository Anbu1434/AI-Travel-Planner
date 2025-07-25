import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router';

export default function SelectDates() {
  const router = useRouter();

  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const ondataselectioncontinue = () => {
    if (!selectedStartDate || !selectedEndDate) {
      ToastAndroid.show('Please select both start and end dates', ToastAndroid.SHORT);
      return;
    }

    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    const timeDifference = end.getTime() - start.getTime();
    const totalNoOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    console.log(totalNoOfDays);

    setTripData({
      ...tripData,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      totalNoOfDays: totalNoOfDays + 1
    });

    router.push('../create-trip/select-buget');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Travel Date</Text>

      <View style={styles.calendarContainer}>
        <CalendarPicker 
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{ backgroundColor: '#000' }}
          selectedDayTextColor="white"
        />
      </View>

      <TouchableOpacity 
        style={styles.continueButton}
        onPress={ondataselectioncontinue}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    marginTop: 100,
    marginLeft: 20,
    textAlign: 'center',
  },
  calendarContainer: {
    marginTop: 30,
  },
  continueButton: {
    backgroundColor: 'black',
    width: 350,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginLeft: 33,
  },
  continueText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'outfit-bold',
  },
});
