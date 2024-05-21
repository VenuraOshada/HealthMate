import React, { Component, useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { UserLocaionContext } from '../../Context/UserLocationContext';
import GlobalApi from '../../Utils/GlobalApi';
import PlaceList from '../../Components/PlaceList';
import PlaceItem from '../../Components/PlaceItem';
import Colors from './../../Utils/Colors';



export default function GoogleMapScreen(){

  //storing the nearby places json response start->
  const [placeList,setPlaceList] = useState([]);
     //storing user location
     const {location,setLocation}=useContext(UserLocaionContext)
 

     useEffect(() => {
      if (location) {
        GetNearBySearchPlace();
      }
    }, [location]);

  
  //end  


  const [mapRegion, setmapRegion] = useState([])




  useEffect(()=>{
    if(location)
      {
        setmapRegion({
          latitude:location.coords.latitude,
          longitude:location.coords.longitude,
          latitudeDelta:0.0522,
          longitudeDelta:0.0421,
        }) 
      }
  },[location])

  const GetNearBySearchPlace=()=>{
    GlobalApi.nearByPlace(location.coords.latitude,location.coords.longitude).then(resp=>{
      setPlaceList(resp.data.results)
      //console.log(resp.data.results.length)
    })
  }

 // console.log("location",location)
  console.log("Number of places nearby"+placeList.length)

  return (
      <ScrollView>
        <MapView style={{width:400,height:300}} provider={PROVIDER_GOOGLE}
         showsUserLocation={true} region={mapRegion}>
            
        </MapView>
        

        <Text style={{fontSize:25,fontFamily:'outfit-bold',color:Colors.BLACK,padding:20}}>Nearest Pharmacies : {placeList.length}</Text>
        <FlatList data={placeList} renderItem={({item})=>(
            <PlaceItem place={item}/>
        )}/>
      </ScrollView>
    )
  
}
