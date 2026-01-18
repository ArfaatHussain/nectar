import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import CustomButton from '../../components/Button';
const {width, height} = Dimensions.get('window');
import { useExitOnBack } from '../../utils/useExitOnBack';
const Welcome = ({navigation}) => {
  useExitOnBack();
  return (
    <ImageBackground
      source={require('../../../assets/images/welcome-background.png')}
      style={styles.container}
    >
      <Text style={styles.header}>Welcome to our store</Text>
      <Text style={styles.subHeader}>Get your groceries in as fast as one hour</Text>
      <CustomButton 
      onPress={()=>navigation.navigate("email-enter")}
      style={{marginBottom: '15%',}} buttonText={"Get Started"} rippleColor="rgba(255, 255, 255, 0.25)" />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'center',     
  },
  header: {
    fontSize: width * 0.10,
    fontWeight: 'bold',
    color: '#fff',
    textAlign:'center',
    marginHorizontal:20
  },
  subHeader:{
    fontSize: width * 0.04,
    color: '#cecccc',
    marginBottom: height * 0.03,
  }
})

export default Welcome
