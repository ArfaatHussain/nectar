import { View, Image } from 'react-native'
import React, {useState} from 'react'
import { Icon, Text } from 'react-native-paper'
import { getDimensions } from '../../utils/getDimensions'
const { width, height } = getDimensions();
import * as Location from 'expo-location';
import CustomButton from '../../components/Button'
import useStore from '../../store/useStore';
const LocationScreen = ({ navigation }) => {
  const setLocation = useStore((state) => state.setLocation);
  async function getCurrentLocation() {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(JSON.stringify(location));
    setLocation(location);
    navigation.navigate("register");
  }
  return (
    <View style={{ flex: 1, paddingVertical: 10, }} >
      <Image source={require("../../../assets/images/map-marker.png")}
        style={{ width: '100%', height: '30%', resizeMode: 'contain', alignSelf: 'center', marginTop: '10%' }}
      />

      <Text variant='headlineMedium' style={{ textAlign: 'center', marginTop: 20 }} >Enable your Location</Text>
      <Text style={{ textAlign: 'center', marginHorizontal: width * 0.1, marginTop: 10, color: '#808080' }} >To provide you the with the fastest delivery esitmates and find the best services in your neighborhood, we need to know where you are.</Text>

      <CustomButton
        onPress={getCurrentLocation}
        buttonText={"Allow Location Access"} style={{ alignSelf: 'center', marginTop: 20 }} />

      {/* <CustomButton
        onPress={() => navigation.navigate("location-search")}
        buttonText={"Not now, enter manually"} mode={"text"} style={{ alignSelf: 'center' }} /> */}

      <Text style={{ textAlign: 'center', marginTop: 30, color: '#808080' }} > <Icon source={"lock"} size={20} color='#808080' /> End-To-End Encrypted </Text>

    </View>
  )
}

export default LocationScreen