import { View, Text } from 'react-native'
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusinessListByCategoryScreen from '../Screens/BusinesListByCategoryScreen/BusinessListByCategoryScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import PrescriptionUploadScreen from '../Screens/PrescriptionScreen/PrescriptionUploadScreen';
import GoogleMapScreen from '../Screens/GoogleMapScreen/GoogleMapScreen';

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
   <Stack.Navigator screenOptions={{
    headerShown:false
   }}>
        <Stack.Screen name='home' component={HomeScreen} />
        <Stack.Screen name='PrescriptionUploadScreen' component={PrescriptionUploadScreen} />
        <Stack.Screen name='business-list' component={BusinessListByCategoryScreen}/>
        <Stack.Screen name='business-detail' component={BusinessDetailsScreen} />
        <Stack.Screen name='GoogleMapScreen' component={GoogleMapScreen} />

   </Stack.Navigator>
  )
}

