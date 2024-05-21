import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';

export default function PlaceItem({ place }) {
  if (!place) {
    return null; // Render nothing if place is undefined
  }

  const { name, vicinity, rating, photos } = place;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: 175,
        alignItems: 'center',
        gap: 3,
        marginBottom: 20
      }}
    >
      <Image
        source={{
          uri: photos && photos[0] ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[0].photo_reference}&key=AIzaSyBizsfsvHan1iGwUJf7rLI276vz_5lNlvg` : null
        }}
        style={{
          width: 110,
          height: 110,
          paddingBottom: 20,
          borderRadius: 15
        }}
      />
      <View>
        <Text numberOfLines={2} style={{ padding: 5,fontFamily:'outfit-bold' }}>{name || ''}</Text>
        <Text>{vicinity || ''}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <AntDesign name="star" size={24} color="orange" />
        <Text style={{ padding: 5,fontFamily:'outfit-bold' }}>{rating || ''}</Text>
      </View>
    </View>
  );
}
