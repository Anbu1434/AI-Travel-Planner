import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
export default function Mytrip() {
  const [userTrips,setUserTrips]= useState([]);
    

  return (
    <View style={{
      padding:20,
      paddingTop:55,
      backgroundColor:'white',
      height:'100%'
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      }}>
      <Text style={{
        fontSize:35,
        fontFamily:'outfit-bold',
        marginLeft:30
      }}>Mytrip✈️</Text>
     <Ionicons name="add-circle" size={48} color="black" style={{ opacity: 0.6 }} />

      </View>

      {userTrips?.length==0?

      <StartNewTripCard/>
      :null
      }
    </View>
  )
}