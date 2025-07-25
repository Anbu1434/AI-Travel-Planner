import { View, Text } from 'react-native'
import React from 'react'
import { useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Discover() {
  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerShown:false,
      headerTransparent:true,
 })

  })
  return (
 
    <View style={{
      backgroundColor:'white',
      height:'100%'
    }}>
      <Text>Discover</Text>
    </View>
  )
}