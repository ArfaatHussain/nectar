import { View, StyleSheet, Image, Dimensions, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../../store/useStore';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

const { width, height } = Dimensions.get('window');

const Splash = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser)
  const navigation = useNavigation();

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ]).start();

    const checkFirstLaunch = async () => {
      try {
        await Asset.loadAsync([
          require('../../../assets/images/welcome-background.png'), // 👈 your welcome background
        ]);
        // await AsyncStorage.removeItem('hasLaunched'); // For testing purposes
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          navigation.replace('auth', { screen: 'welcome' });
        } else {
          const userString = await AsyncStorage.getItem("user")
          const user = userString ? JSON.parse(userString) : {}
          if (Object.keys(user).length > 0) {
            setUser(user)
            navigation.replace('tabs', { screen: 'home' });
          } else {
            navigation.replace('auth', { screen: 'login' });
          }
        }
      } catch (error) {
        console.log('Error checking first launch:', error);
        navigation.replace('auth', { screen: 'login' });
      }
    };

    const timer = setTimeout(checkFirstLaunch, 1800);
    return () => clearTimeout(timer);
  }, [user, navigation, scaleAnim, rotateAnim]);

  // Convert rotation value to degrees
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../assets/logo.png')}
        style={[
          styles.logo,
          {
            transform: [
              { scale: scaleAnim },  // bounce with scale
              { rotate }             // smooth rotation
            ]
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: width * 0.7,
    height: height * 0.4,
    resizeMode: 'contain'
  }
});

export default Splash;
