import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading';

export default function Slider() {
  return (
    <View>
        <Heading text={'Offers For You'} />
        {/* Slider content removed */}
    </View>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontSize:20,
        fontFamily:'outfit-medium',
        marginBottom:10
    },
})
