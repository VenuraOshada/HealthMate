import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Assuming you're using Expo
import axios from 'axios';
import Colors from '../../Utils/Colors';

const PrescriptionUploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const pickImage = async () => {
    // Request camera and storage permissions (if needed)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to choose an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Optional: Allow image editing
      aspect: [4, 3], // Optional: Set preferred aspect ratio (4:3 is common)
      quality: 1, // Optional: Set image quality (1 for highest)
      base64: true, // Optionally return image as base64 string
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri); // Update state with image URI
    }
  };

  const uploadImage = async () => {
    try {
      // Check if image URI is available and valid
      if (!selectedImage || !selectedImage.trim()) {
        alert('Please select an image first.');
        return;
      }

      const formData = new FormData();

      // Append the image file to the FormData object
      const uriParts = selectedImage.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('image', {
        uri: selectedImage,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });

      const response = await axios.post('http://192.168.124.153:3000/process-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set the response data in state
      setResponseData(response.data);

    } catch (error) {
      console.error('Image upload error:', error);
      alert('Error uploading image. Please try again.'); // Inform user of error
    }
  };

  return (
    
    <View style={styles.container}>

    <Text style={{fontSize:30,fontFamily:'outfit-bold',color:Colors.BLACK,paddingBottom:10}}>AI Prescription Scanner</Text>

      <TouchableOpacity onPress={pickImage} style={styles.selectButton}>
        <Text style={styles.selectButtonText}>Select Prescription Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}
      <Button title="Upload Prescription" onPress={uploadImage} />
      {responseData && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Response from Server:</Text>
          <Text style={{fontFamily:'outfit-bold'}}>{responseData}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontFamily:'outfit-bold'
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'outfit-bold'
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  responseContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  responseText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PrescriptionUploadScreen;
