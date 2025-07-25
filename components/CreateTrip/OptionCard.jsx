import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Corrected Icon Import

export default function OptionCard({ option,selectedOption }) {
  return (
    <View style={[{
      padding:20,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'#F5F5F5',
      marginTop:20,
      borderRadius:10,
      shadowColor: "#000",
      },selectedOption === option.title ? {borderWidth:2} : {borderWidth:0,borderColor:'#132235'}]}>
      <View>
        <Text style={{
          fontSize:20,
          fontFamily:'outfit-bold'
        }}>
          {option?.title}
        </Text>
        <Text style={{
          fontSize:16,
          fontFamily:'outfit-regular',
          color:'grey'
        }}>
          {option?.description}
        </Text>
      </View>
      <Text style={{
        fontSize:30,
      }}>{option.icon}</Text>
    </View>
  );
}

