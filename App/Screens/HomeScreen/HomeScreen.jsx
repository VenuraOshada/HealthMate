import React from 'react';
import { View, ScrollView, Button, TouchableOpacity, Text } from 'react-native';
import Header from './Header';
import BusinessList from './BusinessList';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToPrescriptionUpload = () => {
    navigation.navigate('PrescriptionUploadScreen');
  };

  const navigateToGoogleMapScreen = () => {
    navigation.navigate('GoogleMapScreen');
  };

  return (
    <ScrollView>
      {/* Header */}
      <Header />

      {/* Button to navigate to prescription upload screen */}
    <TouchableOpacity onPress={navigateToPrescriptionUpload} style={{ alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
     <View style={{ backgroundColor: '#FFFFFF', padding: 60, borderRadius: 10,marginTop:20, marginBottom: 10 }}>
       <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333333' }}>Prescription Scanning</Text>
    </View>
    </TouchableOpacity>

    {/* Button to navigate to Locate Pharmacy screen */}
    <TouchableOpacity onPress={navigateToGoogleMapScreen} style={{ alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
     <View style={{ backgroundColor: '#FFFFFF', padding: 60, borderRadius: 10,marginTop:20, marginBottom: 10 }}>
       <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333333' }}>    Locate Pharmacy   </Text>
    </View>
    </TouchableOpacity>

 


      <View style={{ padding: 20 }}>
        {/* Business List */}
        <BusinessList />
      </View>
     

    </ScrollView>
  );
};

export default HomeScreen;
